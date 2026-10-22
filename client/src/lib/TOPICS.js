import {
  PanelsTopLeft,
  Database,
  Network,
  CodeXml,
  MessagesSquare,
  ChartNoAxesCombined,
} from "lucide-react";

export const TOPICS = [
  {
    value: "frontend",
    label: "Frontend Development",
    icon: PanelsTopLeft,
    description:
      "Build better interfaces, from browser fundamentals to modern frameworks.",
    tags: "JavaScript · React · CSS",
    overview: "Practice the skills behind thoughtful, responsive web experiences.",
  },
  {
    value: "backend",
    label: "Backend Development",
    icon: Database,
    description:
      "Go deeper on APIs, databases, and reliable server-side architecture.",
    tags: "APIs · Databases · Security",
    overview:
      "Strengthen the server-side thinking that keeps applications reliable.",
  },
  {
    value: "systemdesign",
    label: "System Design",
    icon: Network,
    description: "Think through trade-offs and design systems that scale.",
    tags: "Architecture · Scaling · Trade-offs",
    overview: "Learn to reason about scale, trade-offs, and architecture.",
  },
  {
    value: "dsa",
    label: "Data Structures & Algorithms",
    icon: CodeXml,
    description: "Sharpen your problem-solving skills and explain your approach.",
    tags: "Arrays · Trees · Complexity",
    overview: "Build confidence solving problems and explaining your approach.",
  },
  {
    value: "behavioral",
    label: "Behavioral Interview",
    icon: MessagesSquare,
    description:
      "Tell your story with clarity and turn your experience into strong answers.",
    tags: "Leadership · Teamwork · STAR",
    overview: "Turn your experience into clear, compelling answers.",
  },
  {
    value: "productmanagement",
    label: "Product Management",
    icon: ChartNoAxesCombined,
    description:
      "Practice product thinking, prioritization, and decisions grounded in data.",
    tags: "Strategy · Metrics · Execution",
    overview: "Sharpen product thinking and data-driven decision making.",
  },
];