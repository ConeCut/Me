export type CourseStatus = "completed" | "in-progress";

export type Course = {
  code: string;
  title: string;
  status: CourseStatus;
  topics: string;
};

export const uio = {
  institution: "University of Oslo (UiO)",
  programme: "Bachelor's in Informatics — Machine Learning and Artificial Intelligence",
  period: "Autumn 2025 — planned completion spring 2028",
  status: "Ongoing · second year",
  // Months are school-year approximations, used only to place the timeline bar.
  start: "2025-08",
  end: "2028-06",
  semesters: ["H25", "V26", "H26", "V27", "H27", "V28"],
  currentSemester: 2, // index into semesters: autumn 2026
  courses: [
    {
      code: "IN2010",
      title: "Algorithms and Data Structures",
      status: "in-progress",
      topics: "Arrays, linked lists, heaps, sorting, complexity analysis.",
    },
    {
      code: "IN2090",
      title: "Databases and Data Modelling",
      status: "in-progress",
      topics: "Relational and ER modelling, SQL joins, grouping, aggregation, HAVING, NULL handling, PostgreSQL.",
    },
    {
      code: "IN1010",
      title: "Object-oriented Programming",
      status: "completed",
      topics: "Object-oriented programming in Java.",
    },
    {
      code: "IN1020",
      title: "Introduction to Computer Technology",
      status: "completed",
      topics: "Foundations of computer technology.",
    },
    {
      code: "IN1160",
      title: "Machine-learning foundations", // shortcut: descriptive label, official title not verifiable on uio.no (page 404); confirm with Cosmin
      status: "completed",
      topics: "kNN, Rocchio classification, linear and logistic regression, k-means clustering.",
    },
    {
      code: "MAT1080",
      title: "Mathematical Foundation of Machine Learning",
      status: "completed",
      topics: "Mathematics underpinning machine-learning methods.",
    },
    {
      code: "STK-IN1050",
      title: "Statistics for Computer Scientists",
      status: "completed",
      topics: "Probability and statistics for informatics.",
    },
  ] satisfies Course[],
} as const;

export const kuben = {
  institution: "Kuben videregående skole",
  programme: "Information Technology and Media Production",
  period: "2022 — 2025",
  start: "2022-08",
  end: "2025-06",
  status: "Completed",
  note: "IT fundamentals, system development, operational and user support. Several school projects are public on GitHub.",
} as const;
