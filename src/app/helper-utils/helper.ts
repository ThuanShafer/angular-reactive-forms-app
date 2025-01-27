import {names} from "../../assets/names";
import {adjectives} from "../../assets/adjectives";

export function assignRandomName() {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

export function assignRandomAdjective() {
  const randomIndex = Math.floor(Math.random() * adjectives.length);
  return adjectives[randomIndex];
}
