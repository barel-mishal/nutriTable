    // TODO: remove slice when I do not need to test the error handling
    // TODO: change unit of ingredient
    // TODO: sort by some key
    // TODO: add search
    // TODO: add infinite scroll

import { component$, useResource$, Resource, useStore, createContextId, useComputed$, useSignal, $, type QwikUIEvent, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { type TypeIngredient, zodIngredientSchema, zodIngredientFields, type Fields, type TypeFieldsIngredient } from "~/ministry_of_health/mohSchema";
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
  const fieldsStore = useStore(fields);
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
    fields: fieldsStore,
  }
}

export type TypeQWikTable<T, D extends Fields<T>> = ReturnType<typeof useQwikTableContext<T, D>>;

export type TypeQwikTableContextId = TypeQWikTable<TypeIngredient, TypeFieldsIngredient>

export const qwikTableIngredientsContextId = createContextId<TypeQwikTableContextId>('QwikTableContext');

const QwikVirtualTable = component$((props: {data: TypeIngredient[], fields: TypeFieldsIngredient}) => {
    const con = useQwikTableContext(props.data, props.fields);
    return <>
    <div ref={con.refView} class={["virtualizer-view"]} onScroll$={con.onScroll}>
      <div ref={con.refTotal} class={['virtualizer']}></div>
      <div class={["table-view"]}>
        <table class={['table']}>
          <thead>

            <tr ref={con.refHeader} class={["header"]}>
            {con.fields.map((key) => {
              return <>
                <th>{key.field && key.title}</th>
              </>
            })}
            </tr>
          </thead>
          <tbody ref={con.refFields}>
            {con.renderedRows.value.map((key) => {
              return <>
                <tr key={key._id} class={['row']}>
                  {con.fields.map((field) => {
                    return <td key={key['_id']}>{key[field.field]}</td>
                  })}
                </tr>
              </>
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
          onResolved={(list) => <QwikVirtualTable data={list.ingredients} fields={list.fields} />}
        />
      </div>
    </div>
    </>
    ;
  });

  function addCssUnit(value: number, unit: 'px' | 'rem' | 'vh' | 'vw' | 'vmin' | 'vmax' | '%' = 'px') {
    return `${value}${unit}`;
  }