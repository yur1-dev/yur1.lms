export type Lesson = {
  name: string;
  done: boolean;
  locked?: boolean;
};

export type Course = {
  title: string;
  desc: string;
  tag: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  lessons: Lesson[];
};

export const courses: Course[] = [
  {
    title: "Web Development Fundamentals",
    desc: "HTML, CSS, and JS basics for building your first sites.",
    tag: "Beginner",
    progress: 80,
    lessons: [
      { name: "Intro to HTML", done: true },
      { name: "CSS Layouts", done: true },
      { name: "JavaScript Basics", done: true },
      { name: "Responsive Design", done: false },
      { name: "Final Project", done: false, locked: true },
    ],
  },
  {
    title: "Database Design 101",
    desc: "Relational modeling, normalization, and SQL queries.",
    tag: "Intermediate",
    progress: 45,
    lessons: [
      { name: "What is a Database?", done: true },
      { name: "Entity Relationships", done: true },
      { name: "Normalization", done: false },
      { name: "SQL Joins", done: false, locked: true },
    ],
  },
  {
    title: "Intro to Networking",
    desc: "OSI model, TCP/IP, and how packets move across the web.",
    tag: "Beginner",
    progress: 20,
    lessons: [
      { name: "OSI Model Overview", done: true },
      { name: "IP Addressing", done: false },
      { name: "DNS & Routing", done: false, locked: true },
    ],
  },
  {
    title: "Capstone Project Workshop",
    desc: "Plan, build, and present your final system project.",
    tag: "Advanced",
    progress: 0,
    lessons: [
      { name: "Choosing a Topic", done: false },
      { name: "Proposal Writing", done: false, locked: true },
      { name: "Build Phase", done: false, locked: true },
    ],
  },
];
