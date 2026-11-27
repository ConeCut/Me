// Honest proficiency tiers (dossier §02). Never convert these into percentages or "expert" labels.
export const tiers = {
  practical: { label: "Practical use", description: "Used repeatedly in coursework and projects." },
  developing: { label: "Currently developing", description: "Learning through study and active project work." },
  academic: { label: "Academic foundations", description: "Studied at university level; not professional experience." },
} as const;

export type Tier = keyof typeof tiers;

export type Skill = {
  name: string;
  tier: Tier;
  group: "Languages" | "Data" | "Web" | "Tooling" | "Computer science" | "Machine learning";
  evidence: string;
};

export const skills: Skill[] = [
  { name: "Python", tier: "practical", group: "Languages", evidence: "Kuben VGS exercises with pytest tests (public repo); UiO coursework." },
  { name: "Java", tier: "practical", group: "Languages", evidence: "Object-oriented programming in Java (IN1010)." },
  { name: "SQL", tier: "practical", group: "Data", evidence: "Joins, grouping, aggregation, HAVING and NULL handling in IN2090; schemas in earlier PHP projects." },
  { name: "PostgreSQL", tier: "practical", group: "Data", evidence: "Database setup and exercises with PostgreSQL and pgAdmin in IN2090." },
  { name: "HTML", tier: "practical", group: "Web", evidence: "MIKA AS website (14 pages) and several earlier web projects." },
  { name: "CSS", tier: "practical", group: "Web", evidence: "Responsive layout and animation for the MIKA AS website." },
  { name: "JavaScript", tier: "practical", group: "Web", evidence: "Navigation, scroll reveals, FAQ and multi-step form logic on the MIKA AS website." },
  { name: "Git & GitHub", tier: "practical", group: "Tooling", evidence: "Version control for all public projects; GitHub CLI on Windows PowerShell." },
  { name: "React", tier: "developing", group: "Web", evidence: "Foundational knowledge; this portfolio is built with React." },
  { name: "Tailwind CSS", tier: "developing", group: "Web", evidence: "Foundational knowledge; used for this portfolio's design system." },
  { name: "FastAPI", tier: "developing", group: "Web", evidence: "Ongoing learning; planned back-end for the MIKA AS platform." },
  { name: "Algorithms & data structures", tier: "academic", group: "Computer science", evidence: "Arrays, linked lists, heaps, sorting methods, algorithm analysis (IN2010)." },
  { name: "Complexity analysis", tier: "academic", group: "Computer science", evidence: "Reasoning about time and space complexity, best-case and general runtime." },
  { name: "Database modelling", tier: "academic", group: "Computer science", evidence: "Relational and ER modelling (IN2090)." },
  { name: "Software engineering", tier: "practical", group: "Computer science", evidence: "Decomposition, debugging, reading code, testing assumptions, iterative implementation." },
  { name: "Supervised learning", tier: "academic", group: "Machine learning", evidence: "kNN, Rocchio classification, linear and logistic regression (IN1160)." },
  { name: "Unsupervised learning", tier: "academic", group: "Machine learning", evidence: "k-means clustering (IN1160) — the hero animation on this page is a live k-means run." },
  { name: "Statistics", tier: "academic", group: "Machine learning", evidence: "STK-IN1050 and MAT1080." },
];

export const tools = ["JetBrains IDEs", "pgAdmin", "PowerShell", "GitHub CLI", "Microsoft 365"] as const;
