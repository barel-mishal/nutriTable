import { type QwikIntrinsicElements, component$, type QRL, Slot } from "@builder.io/qwik";


export interface Options extends Partial<QwikIntrinsicElements['option']> {
    id: QwikIntrinsicElements['option']['id'];
    value: QwikIntrinsicElements['option']['value'];
    label: QwikIntrinsicElements['option']['label'];
    disabled: QwikIntrinsicElements['option']['disabled'];
    selected: QwikIntrinsicElements['option']['selected'];
}

interface InputProps extends Partial<QwikIntrinsicElements['select']> {
    id: QwikIntrinsicElements['select']['id'];
    name: QwikIntrinsicElements['select']['name'];
    value: QwikIntrinsicElements['select']['value'];
    title: QwikIntrinsicElements['select']['title'];
    onInput?: QRL<QwikIntrinsicElements['select']['onInput$']>;
}

const Select = component$((props: InputProps) => {
    return <>
    <label for={props.id} class={['flex flex-col max-w-xs']}>
        <span class={['font-semibold tracking-wider leading-none py-2 px-1']}>{props.title}</span>
        <select {...props} class={['border-sky-300 border rounded py-2 px-2 focus-visible:outline-sky-600',]} >
            <Slot />
        </select>
    </label>
    </>
});

export const QwikOption = component$((props: Options) => {
    return <option {...props} />
})


export default Select;