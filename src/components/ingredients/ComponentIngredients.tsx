import { component$, useResource$, Resource, Slot } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { type TypeIngredient, zodIngredientSchema, FoodKeys, type TypeFoodKey } from "~/ministry_of_health/mohSchema";

export const QwikTable = component$((props: { [key: string]: any }) => {
  return <>
  <div id="Hi" class="block w-full overflow-x-auto max-w">
    <table {...props} class="items-center w-full bg-transparent border-collapse">
      <Slot  />
    </table>
  </div>
  </>
}) 

export default component$(() => {
    const loc = useLocation();
    const list = useResource$<TypeIngredient[]>(async () => {
      const URL = `${loc.url.origin}/ministryOfHealthData/data/parsedFoods.json`;
      const res = await fetch(URL);
      // TODO: remove slice when I do not need to test the error handling
      const data = (await res.json()).slice(0, 10);
      const parsed = zodIngredientSchema.array().safeParse(data);
      if (!parsed.success) throw Promise.reject(parsed.error.message);
      return parsed.data
    });
    

    return (
      <Resource
        value={list}
        onRejected={(err) => <div>Error: {err.message}</div>}
        onPending={() => <div>Loading...</div>}
        onResolved={(list) => <Ingredients ingredients={list} />}
      />
    );
  });


  function Ingredients(props: { ingredients: TypeIngredient[] }) {
    const ingredients = props.ingredients;
    // TODO: remove slice when I do not need to test the error handling
    // TODO: change unit of ingredient
    // TODO: sort by some key
    // TODO: i
    return <>
    <QwikTable key={'QwikTable'}>
        <thead>
            <tr>
                {FoodKeys.map((key, index) => <th key={index}>{key}</th>)}
            </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) => <>
            <tr key={index}>
              {FoodKeys.map((key: TypeFoodKey, index) => {
                const value = ingredient[key];
              return <>
                <td key={index}>{value}</td>
              </>})}
            </tr>
          </>)}
        </tbody>
    </QwikTable>
    </>
  }