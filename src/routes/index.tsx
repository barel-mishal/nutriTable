import {  Resource, component$, useResource$,  } from '@builder.io/qwik';
import {  useLocation, type DocumentHead,  } from '@builder.io/qwik-city';


const Cmp = component$(() => {
  const loc = useLocation();
  const list = useResource$<{_id: number, shmmitzrach: string}[]>(() => {
    const url = `${loc.url.origin}/ministryOfHealthData/data/parsedFoods.json`;
    return fetch(url).then((v) => v.json());
  });

  return <Resource 
  value={list} 
  onRejected={(err) => <div>Error: {err.message}</div>}
  onPending={() => <div>Loading...</div>}
  onResolved={(items) => (
    <ul>
      {/* {items as string} */}
      {items.map((item) => (
      <li key={item._id}>{item.shmmitzrach}</li>
      ))}
   </ul>
  )}/>
});

export default component$(() => {
  return (
    <>
      <h1>Product Details</h1>
      <Cmp />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};