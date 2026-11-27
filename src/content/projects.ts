export type ProjectStatus = "live" | "in-progress" | "coursework" | "archive";

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  coursework: "Coursework",
  archive: "Archive",
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  period: string;
  status: ProjectStatus[];
  summary: string;
  problem: string;
  role: string;
  stack: string[];
  built: string[];
  next?: string[];
  learned: string;
  links: { label: string; href: string }[];
};

// Every claim below was checked against the repository contents on 27 Nov 2026.
export const projects: Project[] = [
  {
    slug: "mika-as",
    index: "01",
    title: "MIKA AS — company website",
    period: "Aug 2026 — present",
    status: ["live", "in-progress"],
    summary:
      "Public website for the transport and logistics company I work for, built from scratch as the first stage of a larger logistics platform.",
    problem:
      "The company needed a professional public presence: who it is, which services it offers, and clear ways for customers to get in touch.",
    role: "Sole developer, working from first-hand knowledge of the company's operations and customers.",
    stack: ["HTML", "CSS", "JavaScript", "Git"],
    built: [
      "Responsive front-end with 14 pages: home, services, about, partners, FAQ, contact, tracking, price calculator, claims, open positions and policies.",
      "Shrinking header, mobile navigation, scroll-triggered reveals and an FAQ accordion in vanilla JavaScript.",
      "Multi-step selection form with validation messaging (submission still to be connected).",
      "Deployed to production at mika-as.eu.",
    ],
    next: [
      "Replace placeholder copy; the README estimates the front-end at around 70% complete.",
      "Planned: FastAPI back-end, PostgreSQL, authentication, real shipment tracking, automated tests and CI/CD.",
    ],
    learned:
      "Scoping a real site for a real business: page structure, responsive layout and incremental delivery under a public URL.",
    links: [
      { label: "Live site", href: "https://mika-as.eu" },
      { label: "Source", href: "https://github.com/ConeCut/MIKA_AS" },
    ],
  },
  {
    slug: "portfolio",
    index: "02",
    title: "This portfolio",
    period: "Nov 2026",
    status: ["in-progress"],
    summary:
      "A personal site and interactive CV, designed and built as a technical piece in its own right.",
    problem: "Present a cross-disciplinary profile credibly: evidence instead of claims, and one source of truth for both the site and the PDF CV.",
    role: "Owner. Built with Claude Code as an AI pair-programmer, with every fact reviewed against my own records.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "Playwright"],
    built: [
      "Typed content modules feed both the website and the print-ready CV.",
      "A live k-means clustering animation on canvas, paused for reduced-motion users.",
      "Static rendering, semantic HTML, keyboard navigation and end-to-end tests.",
    ],
    learned: "Design systems, accessibility testing and how a statically rendered React app is structured.",
    links: [{ label: "Source", href: "https://github.com/ConeCut/Me" }],
  },
  {
    slug: "uio-coursework",
    index: "03",
    title: "Algorithms & databases coursework",
    period: "2025 — present",
    status: ["coursework"],
    summary: "Programming, algorithm and SQL exercises from my UiO courses. The code is coursework and is not published.",
    problem: "Build a working understanding of the fundamentals behind efficient software and reliable data.",
    role: "Student.",
    stack: ["Java", "SQL", "PostgreSQL", "pgAdmin"],
    built: [
      "Object-oriented programming in Java (IN1010); lists, heaps, sorting methods and time and space complexity analysis (IN2010).",
      "Relational queries with joins, grouping, aggregation, HAVING filters and NULL handling, plus ER modelling and database setup (IN2090).",
    ],
    learned: "Reasoning about cost before writing code, and modelling data before querying it.",
    links: [],
  },
  {
    slug: "cars4u",
    index: "04",
    title: "Cars4U — community forum",
    period: "Feb — Jun 2024 · Kuben VGS",
    status: ["archive"],
    summary: "A car-enthusiast forum with accounts, image posts, likes and replies, documented as a school project.",
    problem: "Design and document a complete small web application with users, content and moderation.",
    role: "Developer and author of the documentation.",
    stack: ["PHP 8", "MySQL", "HTML", "CSS", "JavaScript"],
    built: [
      "Sign-up and login with hashed passwords and sessions.",
      "Posts with images, likes, dislikes and replies, backed by a relational schema.",
      "Technical documentation, risk analysis and user guide.",
    ],
    learned: "Relational schema design and the full cycle of documenting a system, not just coding it.",
    links: [{ label: "Source", href: "https://github.com/ConeCut/cars4u" }],
  },
  {
    slug: "ticket-system",
    index: "05",
    title: "Support ticket system",
    period: "Mar — Apr 2024 · Kuben VGS",
    status: ["archive"],
    summary: "A ticket website where users submit enquiries and track their status, with an admin view.",
    problem: "Plan and build a two-week web project with authentication, ticket types and status tracking.",
    role: "Developer.",
    stack: ["PHP", "MySQL / MariaDB", "Apache", "Ubuntu (Hyper-V)"],
    built: [
      "Database schema with users and tickets linked by a foreign key, with an ER diagram.",
      "Ticket submission, status pages and admin updates.",
    ],
    learned: "Planning milestones and modelling relations between users and their data.",
    links: [{ label: "Source", href: "https://github.com/ConeCut/ace" }],
  },
  {
    slug: "php-auth",
    index: "06",
    title: "PHP authentication with an MVC split",
    period: "Nov 2023 — Apr 2024 · Kuben VGS",
    status: ["archive"],
    summary: "Login and sign-up flow with comments, separating model, view and controller logic.",
    problem: "Move from a first working login form to a structured, safer implementation.",
    role: "Developer.",
    stack: ["PHP", "MySQL", "CSS"],
    built: ["Separate model, view and controller files for login and sign-up, with session configuration, password hashing and validation for empty fields, email format and duplicate accounts."],
    learned: "Why separating responsibilities makes code easier to change and to secure.",
    links: [{ label: "Source", href: "https://github.com/ConeCut/PROPER_PHP_LogIN_SignUP_Form" }],
  },
];
