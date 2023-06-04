import { $, type QwikChangeEvent, component$, useSignal, useStore, createContextId, useContext } from "@builder.io/qwik";
import { HEIGHT, WEIGHT, AGE, GENDER, type KeyofFittnessType, FittnessSchema, type TypeFittness, listPhysicalActivityLevel, ACTIVITY_LEVEL } from "~/utiles/fitnessCalculators/FittnessSchema";
import QwikInput from "../ui/QwikInput";
import QwikSelect, { QwikOption } from "../ui/QwikSelect";


export const useFitness = (fitness: Partial<TypeFittness>) => {
    const fitnessStore = useStore<Partial<TypeFittness>>(fitness);
    return fitnessStore;
}

type Fit = ReturnType<typeof useFitness>;

export const fitnessContext = createContextId<Fit>('fit');


// to create a modal <div class={'fixed inset-0 bg-black bg-opacity-50'}>lkjlkj</div> 
const FitnessCalculator = component$((props: any) => {
    const fitnessStore = useContext(fitnessContext);
    const nameSignal = useSignal<string>(props.name || '');
    
    

    const computeActivityLevel = $(() => {
        const defaultOption ={value: 'activityLevel', title: 'פעילות', disabled: false, selected: !fitnessStore.activityLevel, label: 'פעילות', id: `input-activityLevel`}
        return [
            <QwikOption key={defaultOption.id} value={defaultOption.value} disabled={defaultOption.disabled} label={defaultOption.label} id={defaultOption.id} selected={!fitnessStore.activityLevel} />,
            ...listPhysicalActivityLevel.numbers.map((item, index) => {
                return  <QwikOption key={`select-${item}-${index}`} value={item} disabled={false} label={listPhysicalActivityLevel.hebrewText[index]} id={`select-${item}-${index}`} selected={fitnessStore.activityLevel === item} />
            })
        ]
    });

    const onFitnessChange = (value: KeyofFittnessType) => $((e: Event | QwikChangeEvent<HTMLSelectElement>, el: HTMLInputElement | HTMLSelectElement) => {
        const parsedValue = FittnessSchema.shape[value].safeParse(el.value);
        if (!parsedValue.success || !parsedValue.data === undefined) return;
        (fitnessStore as any)[value] = parsedValue.data;
    });

    return <>
    <div class={'h-screen grid place-content-center'}>
        <QwikInput 
            title="שם:" 
            id="name" 
            name="input-name" 
            type="text" 
            inputMode="text"
            value={nameSignal.value} 
            onInput$={(e, el) => nameSignal.value = el.value}
        />
        <QwikSelect 
            title="מין אישה או גבר" 
            id={`select-${GENDER}`}
            name={GENDER} 
            value={fitnessStore.gender} 
            onChange$={onFitnessChange(GENDER)}
        >
            <QwikOption disabled={false} id="undefined" label="בחר" selected={!fitnessStore.gender} value={undefined}  />
            <QwikOption disabled={false} id="male" label="גבר" selected={fitnessStore.gender === 'male'} value={'male'}  />
            <QwikOption disabled={false} id="female" label="אישה" selected={fitnessStore.gender === 'female'} value={'female'}  />
        </QwikSelect>
        <QwikInput 
            title="גיל בשנים:" 
            id={AGE} 
            name={`${AGE}-name-input`}
            type="text" 
            inputMode="numeric"
            onInput={onFitnessChange(AGE)}
            value={fitnessStore.age} 
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
        <QwikSelect 
            title="כמות הפעילות היומית:" 
            id={`select-${ACTIVITY_LEVEL}`}
            name={ACTIVITY_LEVEL} 
            value={fitnessStore.activityLevel} 
            onChange$={onFitnessChange(ACTIVITY_LEVEL)} 
        >
            {computeActivityLevel()}
        </QwikSelect>
    </div>
    </>
})

export default FitnessCalculator;

