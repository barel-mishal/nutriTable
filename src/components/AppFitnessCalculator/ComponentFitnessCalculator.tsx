import { $, type QwikChangeEvent, component$, useSignal, useStore } from "@builder.io/qwik";
import { HEIGHT, WEIGHT, AGE, GENDER, type KeyofFittnessType, FittnessSchema, type TypeFittness, listPhysicalActivityLevel, ACTIVITY_LEVEL } from "~/utiles/fitnessCalculators/FittnessSchema";
import QwikInput from "../ui/QwikInput";
import QwikSelect, { QwikOption } from "../ui/QwikSelect";

// to create a modal <div class={'fixed inset-0 bg-black bg-opacity-50'}>lkjlkj</div> 
const FitnessCalculator = component$((props: any) => {
    const nameSignal = useSignal<string>(props.name || '');
    const fitnessStore = useStore<Partial<TypeFittness>>(props.fitnessStore || {});

    // const computedGender = () => {
    //     const defaultOption = {value: 'gneder', title: 'מין', disabled: false, selected: !fitnessStore.gender, label: 'מין', id: `input-gneder`}
    //     return [
    //         <option key={defaultOption.id} value={defaultOption.value} disabled={defaultOption.disabled}>{defaultOption.label}</option>,
    //         ...genders.english.map((item, index) => {
    //             const option = {value: item, title: item, disabled: false, selected: fitnessStore.gender === item, label: genders.hebrew[index], id: `select-${item}-${index}`}
    //             return <option key={option.id} value={option.value} disabled={option.disabled}>{option.label}</option>
    //         })
    //       ]
    // };

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

        console.log(fitnessStore[value])
    });




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

