<script>
	import { createEventDispatcher } from 'svelte';
    //needed for components to dispatch events.(called event dispatcher)
	const dispatch = createEventDispatcher();
    // must be called when the component is first instantiated 
	
    
    function sayHello() {
		dispatch('myevent', {
			text: 'Hdsadd!'
		});
	}
</script>

<button on:click={sayHello}>
	Inner button
</button>