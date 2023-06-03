import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import ComponentFitnessCalculator from "~/components/AppFitnessCalculator/ComponentFitnessCalculator";
import ComponentIngredients from "~/components/AppIngredients/ComponentIngredients";


export default component$(() => {
  return (
    <>
      <ComponentFitnessCalculator />
      <ComponentIngredients />
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
