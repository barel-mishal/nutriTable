import type { Person } from "./bmrEquations";

export default (person: Person) => {
  // person.weight is in kg, person.height is in cm
  // BMI = weight (kg) / height (m) ^ 2
  const height = person.height / 100; // convert cm to m
  return person.weight / (height * height);
};
