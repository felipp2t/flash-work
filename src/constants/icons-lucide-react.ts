import * as Icons from "lucide-react";

export const ICONS_LUCIDE_REACT = Object.entries(Icons).map(([name, Icon]) => ({
  name,
  component: Icon,
})).flat();
