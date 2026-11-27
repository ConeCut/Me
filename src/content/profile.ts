// Single source of truth for personal facts. Source: dossier (27 Nov 2026) + user decisions.

// shortcut: falls back to localhost until a production domain exists; set SITE_URL at deploy time.
export const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export const profile = {
  name: "Cosmin-Ionel Enachescu",
  givenName: "Cosmin-Ionel",
  familyName: "Enachescu",
  role: "Informatics student — Machine Learning & Artificial Intelligence",
  location: "Oslo, Norway",
  email: "enachescucosmin2016@gmail.com",
  github: "https://github.com/ConeCut",
  githubHandle: "ConeCut",
  thesis:
    "I study machine learning and AI at the University of Oslo, and I work in transport operations alongside my studies, after two years in the company's administration. I build software with both in mind: the system, and the work it has to support.",
  // Hero status strip.
  status: [
    ["Studying", "BSc Informatics: ML & AI · Year 2"],
    ["Working", "Transport Leader, MIKA AS"],
    ["Building", "MIKA AS website"],
    ["Based in", "Oslo, Norway"],
  ],
  summary:
    "Informatics student at the University of Oslo, specialising in Machine Learning and Artificial Intelligence. Building a practical foundation in programming, algorithms, data structures, relational databases and web development, alongside hands-on experience in transport operations, logistics coordination, customer communication and administration.",
  throughLine:
    "A technically curious, operationally experienced problem-solver who understands both the systems being built and the real-world work those systems are meant to support.",
} as const;

export const about = {
  paragraphs: [
    "I am in the second year of a Bachelor's in Informatics at the University of Oslo, on the Machine Learning and Artificial Intelligence programme. My coursework so far covers object-oriented programming in Java, algorithms and data structures, relational databases, statistics and the mathematical foundations of machine learning.",
    "Alongside my studies I work as Transport Leader at MIKA AS, where I plan routes, coordinate drivers and follow up customers, contracts and invoicing. Before that I handled the company's administration. I also work in field operations as a parking attendant.",
    "The two sides inform each other. Operations taught me to care about constraints, documentation and the people who rely on a system working on a Monday morning. Computer science gives me the tools to improve that work, which is why the MIKA AS website is the project I am building right now.",
  ],
  workingStyle: [
    { label: "Accuracy", text: "Clear reasoning, concise communication and practical outcomes." },
    { label: "Direct feedback", text: "Prefers explicit corrections and named assumptions over vague praise." },
    { label: "Intuition → formalism", text: "Understands a concept intuitively first, then formalises it and practises on small problems." },
    { label: "Ownership", text: "Comfortable taking responsibility for practical decisions across technical and operational work." },
  ],
  interests: ["Machine learning", "Algorithms & data structures", "Databases", "Practical web software"],
} as const;

export const languages = [
  { name: "Romanian", level: "Native" },
  { name: "Norwegian", level: "Fluent · working language" },
  { name: "English", level: "Fluent" },
  { name: "Italian", level: "Good spoken ability" },
] as const;
