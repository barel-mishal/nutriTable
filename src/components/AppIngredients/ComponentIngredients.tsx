import { component$, useResource$, Resource, Slot } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { type TypeIngredient, zodIngredientSchema, zodIngredientFields, type TypeFieldsIngredient } from "~/ministry_of_health/mohSchema";
import QwikVirtualTable from "../QwikVirtualTable/QwikVirtualTableComponent";

export const ComponentIngredients = component$(() => {
  return <>
  <Slot />
  </>
});

export default component$(() => {
    const loc = useLocation();
    const list = useResource$<{ingredients: TypeIngredient[], fields: TypeFieldsIngredient}>(async () => {
      const URL = `${loc.url.origin}/ministryOfHealthData/data/parsedFoods.json`;
      const URL2 = `${loc.url.origin}/ministryOfHealthData/data/parsedFields.json`;
      const res = await fetch(URL);
      const res2 = await fetch(URL2);
      // TODO: remove slice when I do not need to test the error handling
      const data = (await res.json()).slice(0, 100);
      const data2 = (await res2.json()).slice(0, 100);
      const parsed = zodIngredientSchema.array().safeParse(data);
      const parsed2 = zodIngredientFields.array().safeParse(data2);
      if (!parsed.success) throw Promise.reject(parsed.error.message);
      if (!parsed2.success) throw Promise.reject(parsed2.error.message);
      const fields = parsed2.data as unknown as TypeFieldsIngredient;
      return {ingredients: parsed.data, fields}
    });

    return <>
    <div class={['grid grid-cols-6 justify-center h-screen']}>
      <div class={['col-start-2 row-start-2 col-span-3']}>
        <button class={['px-5 py-2 bg-sky-800 text-sky-50 rounded-lg ring-1 ring-sky-200']}>
          קבל נתונים תזונתיים קלוריות, המלצות צריכה ועוד
        </button>
      </div>
      <div class={['grid place-content-center col-start-2 col-span-4']}>
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

