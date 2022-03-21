import { writable } from 'svelte/store';
import { readable } from 'svelte/store';
import { derived } from 'svelte/store';

//For the counting function
export const count = writable(0);


//Readable stores for reading the time
export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => { //the START function is called when store gets it's first subscriber
		set(new Date());
	}, 1000);


	return function stop() { //is called when the last subscriber leaves.
		clearInterval(interval);
	};
});
//
//derived, for when you want to derive a value based off of other store values
const start = new Date();

export const elapsed = derived(
	time, //tager imod en store(s).. kun time-store her
	$time => Math.round(($time - start) / 1000) //2. parameter er en callback  "that aggregates teh value"
);

//CUSTOM STORES
/* Så længe et object implementerer "subscribe" metoden, så bliver det til en store i svelte.
Så kan man lave sine egne stores således:
(Sådan her så undgår man at have "set" og "update" metoder.. dnu why det er smart.)
*/

function createCount() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update(n => n + 1),
		decrement: () => update(n => n - 1),
		reset: () => set(0)
	};
}

export const countCustomStore = createCount();

// STORE BINDINGS
export const name = writable('placeholder');

export const greeting = derived(
	name,
	$name => `Hello ${$name}!`
);



