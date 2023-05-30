import { component$, useResource$, Resource, Slot, useStore, createContextId, useContextProvider, useContext } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { type TypeIngredient, zodIngredientSchema, FoodKeys, type TypeFoodKey } from "~/ministry_of_health/mohSchema";



function useQwikTableContext<T, D extends keyof T>(data: T[], fields: D[]) {
  const store = useStore({
    height: 500,
    fieldHeight: 30,
  });

  return {
    store,
    data,
    fields,
  }
}

export type TypeQWikTable<T, D extends keyof T> = ReturnType<typeof useQwikTableContext<T, D>>;

export type TypeQwikTableContextId = TypeQWikTable<TypeIngredient, keyof TypeIngredient>
export const qwikTableIngredientsContextId = createContextId<TypeQwikTableContextId>('QwikTableContext');

export const QwikTable = component$((props: {tableContext: TypeQwikTableContextId}) => {
  useContextProvider(qwikTableIngredientsContextId, props.tableContext);
  return <>
  <div id="tableWrap" class="block w-full overflow-x-auto max-w" style={{'height': `${props.tableContext.store.height}px`}}>
    <table {...props} class="items-center w-full bg-transparent border-collapse ">
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
      const data = (await res.json()).slice(0, 30);
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


  const Ingredients = component$((props: { ingredients: TypeIngredient[] }) => {
    const ingredients = props.ingredients;
    const table = useQwikTableContext(ingredients, FoodKeys);
    
    // TODO: remove slice when I do not need to test the error handling
    // TODO: change unit of ingredient
    // TODO: sort by some key
    // TODO: add search
    // TODO: add infinite scroll
    return <>
    <div class={['']}>
      <div class={['m-5']}>
        <QwikTable key={'QwikTable'} tableContext={table}>
            <QwikTableHead key={'QwikTableHead'} />
            <tbody>
              {ingredients.map((ingredient, index) => <>
                <tr key={index}>
                  {FoodKeys.map((key: TypeFoodKey, index) => {
                    const value = ingredient[key];
                  return <>
                    <td key={index} class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-emerald-800">
                      {value}
                      </td>
                  </>})}
                </tr>
              </>)}
            </tbody>
        </QwikTable>
      </div>
    </div>
    </>
  })

  const QwikTableHead = component$(() => {
    const table = useContext(qwikTableIngredientsContextId);

    return <>
        <thead>
            <tr>
                {table.fields.map((key, index) => {
                return <>
                <th key={index} 
                  class={["px-6 sticky top-0 bg-emerald-200 hover:border-emerald-600 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-left text-emerald-950"]}>
                  {key}
                </th>
                </>})}
            </tr>
        </thead>
    </>
  })

