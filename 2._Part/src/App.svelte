<script>
	import { count, time, elapsed, countCustomStore, name, greeting  } from '../src/stores/stores.js';
	import Incrementer from '../src/components/Incrementer.svelte'
	import Decrementer from '../src/components/Decrementer.svelte'
	import Resetter from '../src/components/Resetter.svelte'

// TIME PART
const formatter = new Intl.DateTimeFormat('en', {
	hour12: true,
	hour: 'numeric',
	minute: '2-digit',
	second: '2-digit'
});
//

</script>



<main>
	<!-- AUTO SUBSCRIPTIONS 
	you can reference a store value by prefixing the store name with "$" 
	Auto-subscription only works with store variables that are declared (or imported)
	at the top-level scope of a component.

	Any name beginning with $ is assumed to refer to a store value. 
	It's effectively a reserved character — 
	Svelte will prevent you from declaring your own variables with a $ prefix.
	-->
<h1>The count is {$count}</h1>
<Incrementer/>
<Decrementer/>
<Resetter/>

<!-- READABLE STORE, for when it doesnt make sense to be able to change the store value-->
<h1>The time is {formatter.format($time)}</h1>

<!-- Derived store, 
	You can create a store whose value is based on the value of one or more other stores with-->
	<p>
		This page has been open for
		{$elapsed} {$elapsed === 1 ? 'second' : 'seconds'}
	</p>
<!-- CUSTOM STORES-->

<h1>The count is {$countCustomStore}</h1>

<button on:click={countCustomStore.increment}>+</button>
<button on:click={countCustomStore.decrement}>-</button>
<button on:click={countCustomStore.reset}>reset</button>

<!-- STORE BINDINGS-->

<h1>{$greeting}</h1> <!-- Subscriber til greeing i stores, og viser den String som er callbacken (tror jeg) -->
<input bind:value={$name}> <!-- value starter på subscribed-value som er name, og ændres-->

<button on:click="{() => $name += '!'}"> <!-- ved click, så ændres name værdien fuldstændig-->
	Add exclamation mark!
</button>



</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}



	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>