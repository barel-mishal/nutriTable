import { component$, useResource$, Resource } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { type TypeIngredient, zodIngredientSchema } from "~/ministry_of_health/mohSchema";

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
    return <>
    <table>
        <thead>
            <tr>
                <th>Header 1</th>
                <th>Header 2</th>
                <th>Header 3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
            </tr>
            <tr>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
            </tr>
        </tbody>
    </table>
    </>
  }