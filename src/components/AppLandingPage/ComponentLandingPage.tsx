import { component$ } from "@builder.io/qwik";


// to create a modal <div class={'fixed inset-0 bg-black bg-opacity-50'}>lkjlkj</div> 
const FitnessCalculator = component$(() => {

    return <>
    <div class={'h-screen'}>
        <div class={'flex flex-col w-full'}>
            <div class={'flex flex-col gap-24'}></div>
            <div class={'flex flex-col lg:flex-row pt-24 px-8 justify-center items-center gap-32'}>
                <div class={'grid gap-5'}>
                    <h1 class={'text-7xl font-bold text-sky-800'}>לגלות יותר על התזונה שלך</h1>
                    <p class={'text-2xl font-semibold text-emerald-700'}>באתר הזה יש כלים להערכה וחישובים תזונתיים</p>
                </div>
                <div></div>
            </div>
        </div>
    </div>
    </>
})

export default FitnessCalculator;

