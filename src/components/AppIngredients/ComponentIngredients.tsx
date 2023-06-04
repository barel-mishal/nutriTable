import { component$, useResource$, Resource, Slot } from "@builder.io/qwik";
import { type TypeIngredient, zodIngredientSchema, zodIngredientFields, type TypeFieldsIngredient } from "~/ministry_of_health/mohSchema";
import QwikVirtualTable from "../QwikVirtualTable/QwikVirtualTableComponent";

export const ComponentIngredients = component$(() => {
  return <>
  <Slot />
  </>
});

export default component$(() => {
    // const loc = useLocation();
    const list = useResource$<{ingredients: TypeIngredient[], fields: TypeFieldsIngredient}>(async () => {
      const URL = `http://127.0.0.1:8080/foods` //`${loc.url.origin}/ministryOfHealthData/data/parsedFoods.json`;
      const URL2 = `http://127.0.0.1:8080/fields`//`${loc.url.origin}/ministryOfHealthData/data/fields.json`;
      const res = await fetch(URL);
      const res2 = await fetch(URL2);
      // TODO: remove slice when I do not need to test the error handling
      const data = await res.json();
      const data2 = await res2.json();
      const parsed = zodIngredientSchema.array().safeParse(data);
      const parsed2 = zodIngredientFields.array().safeParse(data2);
      if (!parsed.success) throw Promise.reject(parsed.error.message);
      if (!parsed2.success) throw Promise.reject(parsed2.error.message);
      const fields = parsed2.data as unknown as TypeFieldsIngredient;
      return {ingredients: parsed.data, fields}
    });

    return <>
    <div class={['grid h-screen']}>
      <div class={['']}>
      </div>
      <div class={['grid']}>
        <Resource
          value={list}
          onRejected={(err) => <div>Error: {err.message}</div>}
          onPending={() => <div>Loading...</div>}
          onResolved={(list) => <>
          <ComponentIngredients >
            <QwikVirtualTable data={list.ingredients} fields={list.fields} />
          </ComponentIngredients>
          </>
        }
        />
        
      </div>
    </div>
    </>
    ;
});

