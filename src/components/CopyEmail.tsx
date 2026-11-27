"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 2000);
          } catch {
            // Clipboard can be blocked (permissions, insecure origin); the mailto link above still works.
          }
        }}
        className="mt-4 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-fg"
      >
        {copied ? <Check className="size-3.5 text-cyan" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
        {copied ? "Copied" : "Copy address"}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
