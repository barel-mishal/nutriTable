import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import ComponentIngredients from "~/components/ingredients/ComponentIngredients";


export default component$(() => {
  return (
    <>
      <h1>Product Details</h1>
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
