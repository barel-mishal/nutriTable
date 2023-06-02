    // TODO: remove slice when I do not need to test the error handling
    // TODO: change unit of ingredient
    // TODO: sort by some key
    // TODO: add search
    // TODO: add infinite scroll

import { component$, useResource$, Resource, useStore, createContextId, useComputed$, useSignal, $, type QwikUIEvent, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { type TypeIngredient, zodIngredientSchema, FoodKeys } from "~/ministry_of_health/mohSchema";
import { type KeysOfNumberOrStringProps } from "~/utiles/utilTypes";
import tableStyle from "./ComponentIngredients.css?inline";


function useQwikTableContext<T, D extends Fields<T>>(table: T[], fields: D) {
  const tableProperties = useStore({
    height: 400,
    width: 100,
    rowHeight: 48,
    maxFieldWidth: 250,
    scrollStartPosition: 0,
    ADD_ITEMS: 10,
  });
  const computeNumberOfRows = useComputed$(() => {
    return Math.floor(tableProperties.height/tableProperties.rowHeight) + tableProperties.ADD_ITEMS;
  });
  const dataStore = useStore(table);
  const renderedRows = useSignal(dataStore.slice(tableProperties.scrollStartPosition, computeNumberOfRows.value));    
  const onScroll = $((e: QwikUIEvent<HTMLDivElement>, el: HTMLDivElement) => {
    tableProperties.scrollStartPosition = Math.floor(el.scrollTop / tableProperties.rowHeight);
    const end = Math.floor(tableProperties.scrollStartPosition + computeNumberOfRows.value);
    const s = tableProperties.scrollStartPosition;
    const ee = end;
    renderedRows.value = dataStore.slice(s, ee);
  });
  useStylesScoped$(tableStyle)
  const refView = useSignal<HTMLDivElement>();
  const refTotal = useSignal<HTMLDivElement>();
  const refHeader = useSignal<HTMLTableRowElement>();
  const refFields = useSignal<HTMLTableRowElement>();
  useVisibleTask$(() => {
    const valueView = refView.value;
    const valueHeight = refTotal.value;
    const valueHeader = refHeader.value;
    const valueFields = refFields.value;
    if (!valueView || !valueHeight || !valueHeader || !valueFields) return;
    const hHeader = valueHeader.clientHeight;
    const tableHeight = addCssUnit(tableProperties.height);
    const tableWidth = addCssUnit(tableProperties.width, '%');
    const tableRowHeight = addCssUnit(tableProperties.rowHeight);
    const tableTotalRowsHeight = addCssUnit((tableProperties.rowHeight * dataStore.length) + hHeader + 45);

    valueView.style.setProperty('--table-height', tableHeight);
    valueView.style.setProperty('--table-width', tableWidth);
    valueView.style.setProperty('--table-row-height', tableRowHeight);
    valueView.style.setProperty('--table-total-rows-height', tableTotalRowsHeight);
    valueView.style.setProperty('--table-max-field-width', addCssUnit(tableProperties.maxFieldWidth));
  });
  return {
    onScroll,
    refView,
    refTotal,
    refHeader,
    refFields,
    renderedRows,
    tableProperties,
    dataStore,
    fields,
  }
}

type Fields<T> = {
  field: KeysOfNumberOrStringProps<T>;
  title: string;
  width?: number;
  unit?: string;
  align?: 'left' | 'right' | 'center';
  sort?: 'asc' | 'desc' | 'none';
  filter?: 'asc' | 'desc' | 'none';
  filterValue?: string;
  filterType?: 'string' | 'number';
  filterOptions?: string[];
}[]

export type TypeQWikTable<T, D extends Fields<T>> = ReturnType<typeof useQwikTableContext<T, D>>;
type D = Fields<TypeIngredient>;
export type TypeQwikTableContextId = TypeQWikTable<TypeIngredient, D>

export const qwikTableIngredientsContextId = createContextId<TypeQwikTableContextId>('QwikTableContext');

const QwikVirtualTable = component$((props: {data: TypeIngredient[], fields: D}) => {
    const con = useQwikTableContext(props.data, props.fields);
    return <>
    <div ref={con.refView} class={["virtualizer-view"]} onScroll$={con.onScroll}>
      <div ref={con.refTotal} class={['virtualizer']}></div>
      <div class={["table-view"]}>
        <table class={['table']}>
          <thead>
            <tr ref={con.refHeader} class={["header"]}>
              <th>
                אינדקס
              </th>
              <th>
                שם מצרך
              </th>
              <th>
                חלבון
              </th>
              <th>
                שומן
              </th>
              <th>
                פחמימה
              </th>
            </tr>
          </thead>
          <tbody ref={con.refFields}>
            {con.renderedRows.value.map((key) => {
              return <tr key={key._id} class={['row']}>
                <td>
                  {key._id}
                </td>
                <td>
                  {key.shmmitzrach}
                </td>
                <td>
                  {key.protein}
                </td>
                <td>
                  {key.total_fat}
                </td>
                <td>
                  {key.carbohydrates}
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
});

export const ComponentIngredients = component$(() => {
  return <>
  
  </>
});

export default component$(() => {
    const loc = useLocation();
    const list = useResource$<TypeIngredient[]>(async () => {
      const URL = `${loc.url.origin}/ministryOfHealthData/data/parsedFoods.json`;
      const res = await fetch(URL);
      // TODO: remove slice when I do not need to test the error handling
      const data = (await res.json()).slice(0, 100);
      const parsed = zodIngredientSchema.array().safeParse(data);
      if (!parsed.success) throw Promise.reject(parsed.error.message);
      return parsed.data
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
          onResolved={(list) => <QwikVirtualTable data={list} fields={FoodKeys} />}
        />
      </div>
    </div>
    </>
    ;
  });

  function addCssUnit(value: number, unit: 'px' | 'rem' | 'vh' | 'vw' | 'vmin' | 'vmax' | '%' = 'px') {
    return `${value}${unit}`;
  }