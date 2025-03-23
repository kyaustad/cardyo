export interface Card {
  color:
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | string;
  avatar?: string;
  title?: string;
  fName: string;
  lName: string;
  email?: string;
  phone: string;
  co?: string;
}
