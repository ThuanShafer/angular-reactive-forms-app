import {names} from "../../assets/names";
import {adjectives} from "../../assets/adjectives";

export function assignRandomName(): string {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

export function assignRandomAdjective(): string {
  const randomIndex = Math.floor(Math.random() * adjectives.length);
  return adjectives[randomIndex];
}

export function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
}
