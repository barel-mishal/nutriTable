import { component$, useContextProvider } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import ComponentFitnessCalculator, { fitnessContext, useFitness } from "~/components/AppFitnessCalculator/ComponentFitnessCalculator";
import ComponentFitnessResults from "~/components/AppFitnessCalculator/ComponentFitnessResults";
import ComponentIngredients from "~/components/AppIngredients/ComponentIngredients";
import ComponentLandingPage from "~/components/AppLandingPage/ComponentLandingPage";


export default component$(() => {
  const fitnessStore = useFitness({
    age: 30,
    height: 172,
    weight: 70,
    activityLevel: '1.2',
    gender: 'female'
})
  useContextProvider(fitnessContext, fitnessStore);
  return (
    <>
      <ComponentLandingPage />
      <ComponentFitnessCalculator />
      <ComponentFitnessResults />
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
