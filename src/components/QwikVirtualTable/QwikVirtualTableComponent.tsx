import { useStore, useComputed$, useSignal, type QwikUIEvent, useStylesScoped$, useVisibleTask$, createContextId, component$, $ } from "@builder.io/qwik";
import type { Fields, TypeIngredient, TypeFieldsIngredient } from "~/ministry_of_health/mohSchema";
import { addCssUnit } from "~/utiles/CSSUtils";
import tableStyle from "./TableStyle.css?inline";

function useQwikTableContext<T, D extends Fields<T>>(table: T[], fields: D) {
    const tableProperties = useStore({
      height: 100,
      width: 100,
      rowHeight: 48,
      maxFieldWidth: 250,
      scrollStartPosition: 0,
      ADD_ITEMS: 20,
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
      const tableHeight = addCssUnit(tableProperties.height, 'vh');
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

export default QwikVirtualTable;