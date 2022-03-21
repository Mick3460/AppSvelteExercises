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

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

//Bindings
//When you want to be able to changes values from an element and up into the component, we can use "bind"
let bindingName = 'Name';

//bind=value takes care of converting input into number values, so we dont need input.value (we need this normally apparently lol)
let numA = 1;
let numB = 2;

//Checkboxes can be used to toggle between states of a value
let checkbox = false;

//Group inputs

	let scoops = 1;
	let flavours = ['Mint choc chip'];

	let menu = [
		'Cookies and cream',
		'Mint choc chip',
		'Raspberry ripple'
	];

	function join(flavours) {
		if (flavours.length === 1) return flavours[0];
		return `${flavours.slice(0, -1).join(', ')} and ${flavours[flavours.length - 1]}`;
	}

//Text area inputs.. den viser bare teksten i et felt.. intet sejt :D
let textValue = `Some words are *italic*, some are **bold**`;

//Select bindings
let questions = [
		{ id: 1, text: `Where did you go to school?` },
		{ id: 2, text: `What is your mother's name?` },
		{ id: 3, text: `What is another personal fact that an attacker could easily find with Google?` }
	];

	let selected;

	let answer = '';

	function handleSubmit() {
		alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`);
	}

//LIFECYCLE
//Lifecycles of components come in onMount and onDestroy (and more, but that aint homework lol)
//onMount will launch a function when the component is created

import { onMount } from 'svelte';

	let photos = [];

	onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		photos = await res.json();
		console.log(photos)
	});

	//onDestroy   MERE I UTILS.js OG TIMER.SVELTE
	import Timer from '../src/components/Timer.svelte';

	let openn = true;
	let secondss = 0;

	const toggle = () => (openn = !openn);
	const handleTick = () => (secondss += 1);

//beforeUpdate and afterUpdate
//udfører en funktion LIGE INDEN og LIGE EFTER at DOM er blevet opdateret.
//Det er godt til at updatere en scroll position og andre ting som er ikke er state-driven.
//npm i elizabot  https://www.npmjs.com/package/elizabot

	import Eliza from 'elizabot';
	import { beforeUpdate, afterUpdate } from 'svelte';

	let divv;
	let autoscroll;

	beforeUpdate(() => { //calculates a value right before the DOM update
		autoscroll = divv && (divv.offsetHeight + divv.scrollTop) > (divv.scrollHeight - 20);
	}); // = divv checks that the div even exists, followed by a check if the scroll is too great

	afterUpdate(() => { //if value is true, scroll to the bottom of the chat ???
		if (autoscroll) divv.scrollTo(0, divv.scrollHeight);
	});

	const eliza = new Eliza(); //instantiate the Eliza library. Remember to npm i elizabot

	let comments = [ //the chat room
		{ author: 'eliza', text: eliza.getInitial() }
	];

	function handleKeydown(event) {
		if (event.key === 'Enter') { //when hitting the enter guy in the chat
			const text = event.target.value; //the text is saved from the event.target.value
			if (!text) return; //if null, dont do shit

			comments = comments.concat({ //concat the comments with the input from user
				author: 'user', //and set the author of the chat to user
				text
			});

			event.target.value = ''; //make the textinput empty

			const reply = eliza.transform(text); //from doc: returns a final phrase in case of a quit phrase
			//basicly makes a reply.

			setTimeout(() => {
				comments = comments.concat({ //makes a placeholder comment and concats its to the list
					author: 'eliza',
					text: '...',
					placeholder: true //gives it a placeholder value 
				});

				setTimeout(() => {
					comments = comments.filter(comment => !comment.placeholder).concat({
						author: 'eliza', //after small timeout, filter out the placeholder comment
						text: reply //and insert a new one with the reply generated above
					});
				}, 500 + Math.random() * 500); //timing
			}, 200 + Math.random() * 200);
		}
	}
	//beforeUpdate afterUpdate done
	//beforeUpdate afterUpdate done
	//beforeUpdate afterUpdate done
	//beforeUpdate afterUpdate done
	//beforeUpdate afterUpdate done



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

	<div id="binding">
	<p></p>
	<input bind:value={bindingName}> 
	<p>Hello {bindingName} </p>

	<label>
		<input type=number bind:value={numA} min=0 max=10> <!-- just the box with the number and arrows up and down-->
		<input type=range bind:value={numA} min=0 max=10> <!-- Makes the slider -->
	</label>
	

	<label>
		<input type=number bind:value={numB} min=0 max=10> <!-- just the box with the number and arrows up and down-->
		<input type=range bind:value={numB} min=0 max=10> <!-- Makes the slider -->
	</label>
	<p>{numA} + {numB} = {numA + numB}</p>


	<label>
		<input type=checkbox bind:checked={checkbox}>
		Yes! Send me all the spam you got
	</label>
	<button disabled={!checkbox} on:click={ () => {console.log("lol") }}>
		Subscribe
	</button>

	<!-- Group binding-->
		<h2>Size</h2>

	<label>
		<input type=radio bind:group={scoops} name="scoops" value={1}>
		One scoop
	</label>

	<label>
		<input type=radio bind:group={scoops} name="scoops" value={2}>
		Two scoops
	</label>

	<label>
		<input type=radio bind:group={scoops} name="scoops" value={3}>
		Three scoops
	</label>

	<h2>Flavours</h2>

	{#each menu as flavour} <!-- Hvert element af smagsvariant arrayet, lav en option, som opdaterer flavour array -->
		<label>
			<input type=checkbox bind:group={flavours} name="flavours" value={flavour}>
			{flavour}
		</label>
	{/each}

	{#if flavours.length === 0}
		<p>Please select at least one flavour</p>
	{:else if flavours.length > scoops}
		<p>Can't order more flavours than scoops!</p>
	{:else}
		<p>
			You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
			of {join(flavours)}
		</p>
	{/if}

	

	<textarea bind:value={textValue}></textarea>
	
	<!--Select bindings -->
	<h2>Security questions</h2>

	<form on:submit|preventDefault={handleSubmit}>	
		<select bind:value={selected} on:change="{() => answer = 'LOL'}"> <!-- answer bliver reset hvis man skifter -->
			<!-- Also, bind:value ændrer på værdien i script, og stemmer overens med værdien i selectboxen.-->
			{#each questions as question} <!--Hvert spørgsmål laves til en option i vores -->
				<option value={question}>
					{question.text}
				</option>
			{/each}
		</select>

		<input bind:value={answer}> <!--Text input -->

		<button disabled={!answer} type=submit> <!--Hvis answer er tomt, så skal den disables. -->
			Submit
		</button>
	</form>

<p>selected question {selected ? selected.id : '[waiting...]'}</p>
	</div>

	<h3>Photo album</h3>

<div class="photos">
	{#each photos as photo}
		<figure>
			<img src={photo.thumbnailUrl} alt={photo.title}>
			<figcaption>{photo.title}</figcaption>
		</figure>
	{:else}
		<!-- this block renders when photos.length === 0 -->
		<p>loading...</p>
	{/each}
</div>


<div><p>---------------------------</p>
	<button on:click={toggle}> {openn ? 'Close' : 'Open'} Timer</button>
	<p>
		The Timer component has been open for
		{secondss} {secondss === 1 ? 'second' : 'seconds'}
	</p>
	{#if openn}
	<Timer callback={handleTick} />
	{/if}
</div>



<div class="chat">
	<h1>Eliza Chat</h1>

	<div class="scrollable" bind:this={divv}> <!-- divv is a boolean-->
		{#each comments as comment}
			<article class={comment.author}>
				<span>{comment.text}</span>
			</article>
		{/each}
	</div>

	<input on:keydown={handleKeydown}>
</div>


</main>




<style>

.chat {
	
		display: flex;
		flex-direction: column;
		height: 30%;
		max-width: 320px;
	}

	.scrollable {
		flex: 1 1 auto;
		border-top: 1px solid #eee;
		margin: 0 0 0.5em 0;
		overflow-y: auto;
	}

	article {
		margin: 0.5em 0;
	}

	.user {
		text-align: right;
	}

	span {
		padding: 0.5em 1em;
		display: inline-block;
	}

	.eliza span {
		background-color: #eee;
		border-radius: 1em 1em 1em 0;
	}

	.user span {
		background-color: #0074D9;
		color: white;
		border-radius: 1em 1em 0 1em;
		word-break: break-all;
	}


	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.photos {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 8px;
	}

	figure, img {
		width: 100%;
		margin: 0;
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