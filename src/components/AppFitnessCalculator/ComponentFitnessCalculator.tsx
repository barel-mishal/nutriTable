import { $, component$, useComputed$, useSignal, useStore } from "@builder.io/qwik";
import { HEIGHT, WEIGHT, type TypeFittness, AGE, genders, GENDER, type KeyofFittnessType, FittnessSchema } from "~/utiles/fitnessCalculators/FittnessSchema";
import QwikInput from "../ui/QwikInput";
import QwikSelect from "../ui/QwikSelect";

// to create a modal <div class={'fixed inset-0 bg-black bg-opacity-50'}>lkjlkj</div> 
const FitnessCalculator = component$((props: any) => {
    const nameSignal = useSignal<string>(props.name || '');
    const fitnessStore = useStore<Partial<TypeFittness>>(props.fitnessStore || {});

    const computedGender = useComputed$(() => {
        return [
            {value: 'gneder', title: 'מין', disabled: false, selected: !fitnessStore.gender, label: 'מין', id: `input-gneder`},
            ...genders.english.map((item, index) => {
              return {value: item, title: item, disabled: false, selected: fitnessStore.gender === item, label: genders.hebrew[index], id: `select-${item}-${index}`}
            })
          ]
    })

    const onFitnessChange = (value: KeyofFittnessType) => $((e: Event, el: HTMLInputElement) => {
        const parsedValue = FittnessSchema.shape[value].safeParse(el.value);
        if (!parsedValue.success || parsedValue.data !== undefined) return;
        fitnessStore[value] = parsedValue.data;
        console.log(fitnessStore[value])
    })


    return <>
    <div class={'h-screen'}>
        <QwikInput 
            title="שם:" 
            id="name" 
            name="input-name" 
            type="text" 
            inputMode="text"

            value={nameSignal.value} 
        />
        <QwikInput 
            title="הגובה במטרים:" 
            id={HEIGHT}
            name={`${HEIGHT}-name-input`}
            type="text" 
            inputMode="decimal"
            onInput={onFitnessChange(HEIGHT)}
            value={fitnessStore.height} 
        />
        <QwikInput 
            title="המשקל בקילוגרמים:" 
            id={WEIGHT} 
            name={`${WEIGHT}-name-input`}
            type="text" 
            inputMode="decimal"
            onInput={onFitnessChange(WEIGHT)}
            value={fitnessStore.weight} 
        />
        <QwikInput 
            title="גיל בשנים:" 
            id={AGE} 
            name={`${AGE}-name-input`}
            type="text" 
            inputMode="numeric"
            onInput={onFitnessChange(AGE)}
            value={fitnessStore.age} 
        />
        <QwikSelect 
            title="מין אישה או גבר" 
            id={`select-${GENDER}`}
            name={GENDER} 
            options={computedGender.value} 
            value={fitnessStore.gender} 
        />
    </div>
    </>
})

export default FitnessCalculator;

