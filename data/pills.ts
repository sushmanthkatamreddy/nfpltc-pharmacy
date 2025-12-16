export interface Pill {
  id: number;
  name: string;
  imprint: string;
  type: string;
  color: string;
  shape: string;
  symptoms: string[];
  image: string;
}

export const pills: Pill[] = [
  {
    id: 1,
    name: "Aspirin",
    imprint: "A81",
    type: "Pain Reliever",
    color: "White",
    shape: "Round",
    symptoms: ["pain", "fever", "inflammation"],
    image: "/pills/aspirin.png",
  },
  {
    id: 2,
    name: "Ibuprofen",
    imprint: "I10",
    type: "NSAID",
    color: "Red",
    shape: "Oval",
    symptoms: ["pain", "swelling", "fever"],
    image: "/pills/ibuprofen.png",
  },
];