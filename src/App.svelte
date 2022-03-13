<script>
	let name = 'worrrd'
	let src = './5Head.png' //Hvor er filen i forhold til index.html
	import Nested from '../src/components/Nested.svelte'
	let stringWithHtml = `Make sure you encode this string to avoid <strong>XSS attacks</strong>`
//Reactivity -v- 
	let count = 0;
	function incrementCount () {
		//event handler code here
		count += 1;
	
	}
	//reactive declarations, when you want to update a value when related values are changed
	$: doubled = count * 2; // Svelte interprets to mean 're-run this code 
							//whenever any of the referenced values change'
	
	//reactive statements, 
	$: if (count >= 10) {
		alert('count is getting too high'); console.log(count)
		count = 8;
	}
//Reactivity is updated by ASSIGNMENTS, so methods dont do this neccesarily.
let numbers = [1,2,3,4];
function addNumberWRONG() {
	numbers.push(numbers.length + 1);
	numbers = numbers; //assignment needed to update
}
function addNumber(){
	numbers = [...numbers, numbers.length + 1]; //assignment with spread
}
$: sum = numbers.reduce((t, n) => t + n, 0);

//Props
import Info from '../src/components/Info.svelte'
const pkg = {
	name: 'HEHENAME',
	version: 3,
	speed: 'blazing lol',
	website: 'https://www.miniclip.com/games/en/#'
}
// LOGIC, Svelte can express logic unlike html! @Line 65
let user = { loggedIn: false};
function toggleLogIn() {
	user.loggedIn = !user.loggedIn;
	console.log('very cool function')
}
/* 
 A # character always indicates a block opening tag.
 A / character always indicates a block closing tag. 
 A : character, as in {:else}, indicates a block continuation tag.
*/
let x = 7;

//For each, copied data because the first link is top tier
let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];
import Thing from '../src/components/Thing.svelte'
let things = [
	{ id: 1, name: 'apple' },
	{ id: 2, name: 'banana' },
	{ id: 3, name: 'carrot' },
	{ id: 4, name: 'doughnut' },
	{ id: 5, name: 'egg' },
];
/* 
https://svelte.dev/tutorial/keyed-each-blocks
fortæller kort om hvorfor keyed objekter bliver slettet anderledes? I dont get it
*/
function handleClick() {
		things = things.slice(1);
	}

// EVENTS
//listening to event
let m = { x: 0, y: 0 };

	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
	function handleClickOnce() {
		alert('clicked')
	}
/*
The full list of modifiers:

preventDefault — calls event.preventDefault() before running the handler. Useful for client-side form handling, for example.
stopPropagation — calls event.stopPropagation(), preventing the event reaching the next element
passive — improves scrolling performance on touch/wheel events (Svelte will add it automatically where it's safe to do so)
nonpassive — explicitly set passive: false
capture — fires the handler during the capture phase instead of the bubbling phase (MDN docs)
once — remove the handler after the first time it runs
self — only trigger handler if event.target is the element itself
trusted — only trigger handler if event.isTrusted is true. I.e. if the event is triggered by a user action.

You can chain modifiers together, e.g. on:click|once|capture={...}. 
*/

//Components event, DISPATCH
import Inner from '../src/components/Inner.svelte'
function handleTheEventFromInner(event) {
		alert(event.detail.text);
	}

//Nested event from Inner
import Outer from '../src/components/Outer.svelte';
</script>



<main>
	<h1>Hello {name.toUpperCase()}!</h1>
	<img {src} alt='Me whenever I code {name}' style="width: 50px;"/>
	<p>this text is different because of styling</p>
	<Nested answer={42}></Nested>
	<Nested/>
	<p> {@html stringWithHtml}</p>

	<button on:click={incrementCount}>count knappen: {count}</button>
	<p>{count} doubled is {doubled}</p>

	<button on:click={addNumber}>Add number method </button>
	<p>{numbers.join(' + ')} = {sum}</p>

	<Info {...pkg}/>

	{#if user.loggedIn}
		<button on:click={toggleLogIn}>
			Log out
		</button>
	{:else}
		<button on:click={toggleLogIn}>
			Log in
		</button>
	{/if}

	{#if count > 10}
	<p>{count} is bigger than 10</p>
	{:else if 5>count}
	<p>{count} is smaller than 5</p>
	{:else}
	<p>{count} is between 10 and 5</p>
	{/if}

	<h2> Cats :)</h2>
	<ul>
		{#each cats as cat,i}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
			{i+1}: {cat.name}
		</a></li>
		{/each}
	</ul>

	<button on:click={handleClick}>
		Remove first thing
	</button>
	
	{#each things as thing (thing.id)}
		<Thing name={thing.name}/>
	{/each}

	<div on:mousemove={handleMousemove}>
		The mouse position is {m.x} x {m.y}
	</div>
	<div on:mousemove={e => m = { x: e.clientX, y: e.clientY //Inline is fine as has no performance influence on Svelte applications
		}}> 
		The mouse position is {m.x} x {m.y}
	</div>

	<button on:click|once={handleClickOnce}>Click me ONCE lel</button>
	<p>__</p>
	
	<Inner on:myevent={handleTheEventFromInner}/>
	<!--  
	component is listening to the messages dispatched by 
	Inner component thanks to the on:message directive.  
	This directive is an attribute prefixed with on: followed 
	by the event name that we are dispatching 
	-->
	<p>Outer -v- </p>
	<Outer on:myevent={handleTheEventFromInner}/>


	

</main>




<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	
	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: 100;
	}

	p { 
		color: purple; 
		font-family: 'Comic Sans MS', cursive;
		font-size: 1em;
	}
	

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>