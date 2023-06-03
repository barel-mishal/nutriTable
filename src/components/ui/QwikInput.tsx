import { type QwikIntrinsicElements, component$, $, type QRL, useSignal } from "@builder.io/qwik";


interface InputProps extends Partial<QwikIntrinsicElements['input']> {
    id: QwikIntrinsicElements['input']['id'];
    name: QwikIntrinsicElements['input']['name'];
    type: QwikIntrinsicElements['input']['type'];
    value: QwikIntrinsicElements['input']['value'];
    title: QwikIntrinsicElements['input']['title'];
    inputMode: QwikIntrinsicElements['input']['inputMode'];
    onInput?: QRL<QwikIntrinsicElements['input']['onInput$']>;
}

const Input = component$((props: InputProps) => {
    const userOnInput = props.onInput
    const inputMode = props.inputMode;
    const notValidInputSignal = useSignal<boolean>(false);
    const onInput = $((e: Event, el: HTMLInputElement) => {
        const currentInput = el.value;
        if (inputMode === 'numeric') {
            el.value = el.value.replace(/[^0-9]/g, '');// only numbers
        } else if (inputMode === 'decimal') {
            el.value = el.value.replace(/[^0-9.]/g, '');// only numbers and dot
        } 

        if (currentInput !== el.value) {
            notValidInputSignal.value = true;
        } else {
            notValidInputSignal.value = false;
        } // if the input was changed, it means that the user entered an invalid character
        
        if (userOnInput) userOnInput(e, el);
    });

    return <>
    <label for={props.id} class={['flex flex-col max-w-xs']}>
        <span class={['font-semibold tracking-wider leading-none py-2 px-1']}>{props.title}</span>
        <input {...props} class={['border-sky-300 border rounded py-2 px-2 focus-visible:outline-sky-600', 
        {'border-pink-700': notValidInputSignal.value}, 
        {'focus-visible:outline-pink-700': notValidInputSignal.value}
        ]} onInput$={onInput} />
    </label>
    </>
})


export default Input;