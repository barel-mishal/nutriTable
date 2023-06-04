import { component$, useComputed$, useContext } from "@builder.io/qwik";
import { fitnessContext } from "./ComponentFitnessCalculator";
import calculateFitnessData from "~/utiles/fitnessCalculators/calculateFitnessData";
import { ActivityLevelSchema } from "~/utiles/fitnessCalculators/FittnessSchema";
import twoDecimalPlaces from "~/utiles/twoDecimalPlaces";





// to create a modal <div class={'fixed inset-0 bg-black bg-opacity-50'}>lkjlkj</div> 
const FitnessResults = component$(() => {
    const fitness = useContext(fitnessContext);

    const computeResults = useComputed$(async () => {
        const parsedActivityLevel = ActivityLevelSchema.safeParse(fitness);
        if (!parsedActivityLevel.success) return;
        console.log(calculateFitnessData({
            person: parsedActivityLevel.data,
            activityLevel: parsedActivityLevel.data.activityLevel
        }))
        return calculateFitnessData({
            person: parsedActivityLevel.data,
            activityLevel: parsedActivityLevel.data.activityLevel
        })
    });



    return <>
    <div class={'h-screen grid place-content-center'}>
        <div class={'min-w-[500px] bg-sky-100 min-h-[300px] p-10 grid gap-4 rounded-2xl'}>
            <h3 class={'text-2xl text-sky-950 font-semibold flex flex-col gap-3'}>
                חישוב האנרגיה היומית במצב מנוחה (BMR):
                <span class={'text-5xl font-bold'}>{twoDecimalPlaces(computeResults.value?.hbBMR || 0)}</span>
            </h3>
            <h3 class={'text-2xl text-sky-950 font-semibold flex flex-col gap-3'}>
                חישוב האנרגיה היומית כולל הפעילות היומית שלך (TDEE):
                <span class={'text-5xl font-bold'}>{twoDecimalPlaces(computeResults.value?.hbTDEE || 0)}</span>
            </h3>
           
        </div>
    </div>
    </>
})

export default FitnessResults;

