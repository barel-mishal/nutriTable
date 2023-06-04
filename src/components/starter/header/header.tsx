import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const closeSignal = useSignal<boolean>(false);
  return (<>
    <header class={'z-50 sticky flex top-5 justify-center'} >
        <div>

        </div>
          {!closeSignal.value && <>
        <div class={'bg-sky-50 p-10 min-w-[370px] rounded-full shadow-md shadow-sky-300 flex items-center gap-3'}>
            <span><button class={'text-2xl text-sky-50 bg-sky-500 rounded-full h-8 w-8 leading-none'} onClick$={() => closeSignal.value = true}>X</button></span><h2 class={'text-3xl text-sky-700'}>טבלה תזונתית</h2>
        </div>
          </>}
    </header>
  </>
  );
});
