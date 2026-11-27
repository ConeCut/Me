"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const K = 4;
const N = 150;
const STEP_MS = 1000;
const HOLD_MS = 4200;
const COLORS = ["124,92,255", "95,179,179", "185,185,194", "160,140,255"];

type Pt = { x: number; y: number; hx: number; hy: number; c: number; phase: number };
type Centroid = { x: number; y: number; tx: number; ty: number };

const gauss = () => {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

/** Blob centres in normalised space, biased right so the name stays legible on wide screens. */
function seedBlobs(wide: boolean) {
  return Array.from({ length: K }, () => ({
    x: wide ? 0.48 + Math.random() * 0.46 : 0.12 + Math.random() * 0.76,
    y: 0.14 + Math.random() * 0.72,
  }));
}

function assignHomes(points: Pt[], wide: boolean) {
  const blobs = seedBlobs(wide);
  points.forEach((p, i) => {
    const b = blobs[i % K];
    p.hx = Math.min(0.98, Math.max(0.02, b.x + gauss() * 0.06));
    p.hy = Math.min(0.96, Math.max(0.04, b.y + gauss() * 0.08));
  });
}

/** K distinct random points as starting centroids (duplicates would leave a cluster empty). */
function seedCentroids(points: Pt[]): Centroid[] {
  const picked = new Set<Pt>();
  while (picked.size < K) picked.add(points[Math.floor(Math.random() * points.length)]);
  return [...picked].map((p) => ({ x: p.hx, y: p.hy, tx: p.hx, ty: p.hy }));
}

/** One Lloyd iteration over the points' home positions. Returns true if any assignment changed. */
function kmeansStep(points: Pt[], centroids: Centroid[]): boolean {
  let changed = false;
  for (const p of points) {
    let best = 0;
    let bestD = Infinity;
    centroids.forEach((c, i) => {
      const d = (p.hx - c.tx) ** 2 + (p.hy - c.ty) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (p.c !== best) changed = true;
    p.c = best;
  }
  centroids.forEach((c, i) => {
    const mine = points.filter((p) => p.c === i);
    if (mine.length) {
      c.tx = mine.reduce((s, p) => s + p.hx, 0) / mine.length;
      c.ty = mine.reduce((s, p) => s + p.hy, 0) / mine.length;
    }
  });
  return changed;
}

/** Live k-means run on canvas: decorative, aria-hidden, static under reduced motion, paused when off-screen. */
export function ClusterField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const wide = () => canvas.clientWidth > 900;

    const points: Pt[] = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      hx: 0,
      hy: 0,
      c: -1,
      phase: Math.random() * Math.PI * 2,
    }));
    assignHomes(points, wide());
    let centroids = seedCentroids(points);
    let iteration = 0;
    let converged = false;
    let lastStep = 0;
    let convergedAt = 0;
    const mouse = { x: -1, y: -1 };

    const caption = () => {
      if (captionRef.current)
        captionRef.current.textContent = `k-means · k = ${K} · n = ${N} · iteration ${String(iteration).padStart(2, "0")}${
          converged ? " · converged" : ""
        }`;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // spokes from centroid to members
      ctx.lineWidth = 1;
      for (const p of points) {
        if (p.c < 0) continue;
        const c = centroids[p.c];
        ctx.strokeStyle = `rgba(${COLORS[p.c]},0.07)`;
        ctx.beginPath();
        ctx.moveTo(c.x * w, c.y * h);
        ctx.lineTo(p.x * w, p.y * h);
        ctx.stroke();
      }
      for (const p of points) {
        ctx.fillStyle = p.c < 0 ? "rgba(185,185,194,0.55)" : `rgba(${COLORS[p.c]},0.85)`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.font = "10px ui-monospace, monospace";
      centroids.forEach((c, i) => {
        const x = c.x * w;
        const y = c.y * h;
        ctx.strokeStyle = `rgba(${COLORS[i]},0.95)`;
        ctx.beginPath();
        ctx.moveTo(x - 7, y);
        ctx.lineTo(x + 7, y);
        ctx.moveTo(x, y - 7);
        ctx.lineTo(x, y + 7);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${COLORS[i]},0.35)`;
        ctx.stroke();
        ctx.fillStyle = "rgba(232,232,236,0.6)";
        ctx.fillText(`c${i + 1}`, x + 15, y - 9);
      });
    };

    resize();

    if (reduce) {
      // Static frame: run to convergence instantly and draw once.
      points.forEach((p) => ((p.x = p.hx), (p.y = p.hy)));
      while (kmeansStep(points, centroids) && iteration < 50) iteration++;
      centroids.forEach((c) => ((c.x = c.tx), (c.y = c.ty)));
      converged = true;
      caption();
      draw();
      const onResize = () => (resize(), draw());
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let raf = 0;
    let visible = true;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;

      if (!converged && t - lastStep > STEP_MS) {
        lastStep = t;
        converged = !kmeansStep(points, centroids) && iteration > 0;
        iteration++;
        if (converged) convergedAt = t;
        caption();
      } else if (converged && t - convergedAt > HOLD_MS) {
        assignHomes(points, wide());
        centroids = seedCentroids(points);
        points.forEach((p) => (p.c = -1));
        iteration = 0;
        converged = false;
        lastStep = t;
        caption();
      }

      for (const p of points) {
        const drift = 0.004;
        let tx = p.hx + Math.sin(t / 1800 + p.phase) * drift;
        let ty = p.hy + Math.cos(t / 2100 + p.phase) * drift;
        if (mouse.x >= 0) {
          const dx = (p.x - mouse.x) * w;
          const dy = (p.y - mouse.y) * h;
          const d = Math.hypot(dx, dy);
          if (d < 110 && d > 0) {
            const push = (1 - d / 110) * 36;
            tx += (dx / d) * (push / w);
            ty += (dy / d) * (push / h);
          }
        }
        p.x += (tx - p.x) * 0.035;
        p.y += (ty - p.y) * 0.035;
      }
      for (const c of centroids) {
        c.x += (c.tx - c.x) * 0.06;
        c.y += (c.ty - c.y) * 0.06;
      }
      draw();
    };

    const io = new IntersectionObserver((entries) => (visible = entries[entries.length - 1].isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
    };
    const onLeave = () => ((mouse.x = -1), (mouse.y = -1));
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    caption();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return (
    <div className={className} aria-hidden>
      <canvas ref={canvasRef} className="size-full" />
      <p ref={captionRef} className="label absolute right-12 bottom-28 hidden text-[0.625rem] lg:block" />
    </div>
  );
}
