export type Track = "operations" | "field";

export type Role = {
  title: string;
  company: string;
  start: string; // ISO yyyy-mm
  end: string | null; // null = present
  period: string; // display string, as documented
  approximate?: true; // start/end only bound the documented range
  track: Track;
  points: string[];
};

// Newest first. The MIKA AS air-cargo security role is intentionally omitted (user decision).
export const experience: Role[] = [
  {
    title: "Parking Attendant",
    company: "P-Norge AS",
    start: "2026-05",
    end: null,
    period: "May 2026 — present",
    track: "field",
    points: [
      "Performs parking enforcement and applies current parking regulations.",
      "Handles public-facing questions and situations professionally.",
      "Documents observations and makes independent operational assessments in the field.",
    ],
  },
  {
    title: "Transport Leader",
    company: "MIKA AS",
    start: "2024-11",
    end: null,
    period: "Nov 2024 — present",
    track: "operations",
    points: [
      "Responsible for day-to-day transport operations, planning, coordination and delivery follow-up.",
      "Coordinates drivers, routes, schedules and assignments; manages ongoing customer communication in Norwegian.",
      "Follows up sales, customer accounts, agreements and contracts, administration, invoicing and basic accounting.",
      "Contributes to internal IT support and improvements to digital work processes.",
    ],
  },
  {
    title: "Parking Attendant",
    company: "VestPark AS",
    start: "2025-12",
    end: "2026-03",
    period: "Dec 2025 — Mar 2026",
    track: "field",
    points: [
      "Enforced parking regulations, planned control routes and handled public enquiries.",
      "Worked independently and made on-site operational decisions.",
    ],
  },
  {
    title: "Administrative Secretary",
    company: "MIKA AS",
    start: "2022-07",
    end: "2024-11",
    period: "Jul 2022 — Nov 2024",
    track: "operations",
    points: ["Handled document management, invoicing, administration and internal coordination."],
  },
  {
    title: "Moving Worker",
    company: "Wolves Services AS",
    start: "2023-01",
    end: "2023-06",
    period: "Jan 2023 — Jun 2023",
    track: "field",
    points: ["Completed moving assignments and logistics tasks with colleagues, often under time constraints."],
  },
  {
    title: "Delivery Courier / Driver Assistant",
    company: "Wolt",
    start: "2022-01",
    end: "2023-12",
    period: "2022 — 2023 · 8 months",
    approximate: true, // only "8 months within 2022–2023" is documented
    track: "field",
    points: ["Completed deliveries with a focus on punctuality, accuracy and efficient route planning."],
  },
];

// Display order: current roles first, then by start date descending.
export const sortedExperience = [...experience].sort((a, b) => {
  if ((a.end === null) !== (b.end === null)) return a.end === null ? -1 : 1;
  return b.start.localeCompare(a.start);
});
