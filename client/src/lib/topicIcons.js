import {
  ChartNoAxesCombined,
  CodeXml,
  MessagesSquare,
  Network,
  PanelsTopLeft,
  Server,
} from "lucide-react";

// Keys are lowercase topic names; covers the six current topics plus
// legacy values (html, javascript, ...) from older interviews.
export const TOPIC_ICONS = {
  "frontend development": PanelsTopLeft,
  "backend development": Server,
  "system design": Network,
  "data structures & algorithms": CodeXml,
  "behavioral interview": MessagesSquare,
  "product management": ChartNoAxesCombined,
};

export const DEFAULT_TOPIC_ICON = CodeXml;
