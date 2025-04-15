---
title: $effect
description: $effect lets you run code when state updates — perfect for things like DOM manipulation, API calls, timers, or animations. It runs in the browser, after the component is mounted and the DOM is updated. Effects re-run automatically when reactive values they depend on change.
category: Runes
order: 8
linksOnThisPage:
    effect-pre: $effect.pre
    effect-tracking: $effect.tracking
    effect-root: $effect.root
    when-not-to-use-effect: When not to use $effect
prevPath:
    derived: $derived
nextPath:
    props: $props
---

<script lang="ts">
    import DeprecatedHeading from '$lib/components/markdown/deprecated-heading.svelte';
    import DeprecatedText from '$lib/components/markdown/deprecated-text.svelte';
    import H3 from '$lib/components/markdown/h3.svelte';
</script>

Effects are functions that run when state updates, and can be used for things like calling third-party libraries, drawing on `<canvas>` elements, or making network requests. They only run in the browser, not during server-side rendering.

Generally speaking, you should not update state inside effects, as it will make code more convoluted and will often lead to never-ending update cycles. If you find yourself doing so, see [when not to use `$effect`](#when-not-to-use-effect) to learn about alternative approaches.

You can create an effect with the `$effect` rune as seen below:

```svelte
<script lang="ts">
	let size = $state<number>(50);
	let color = $state<string>('#ff3e00');

	let canvas: HTMLCanvasElement;

	$effect(() => {
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);

		// this will re-run whenever `color` or `size` change
		context.fillStyle = color;
		context.fillRect(0, 0, size, size);
	});
</script>

<canvas
	bind:this={canvas}
	width="100"
	height="100"
></canvas>
```

When Svelte runs an effect function, it tracks which pieces of state (and derived state) are accessed (unless accessed inside [`untrack`](/docs/svelte/svelte#untrack)), and re-runs the function when that state later changes.

If you’re having difficulty understanding why your `$effect` is rerunning or is not running see [understanding dependencies](#understanding-dependencies).

<DeprecatedHeading />

Effects are triggered differently than the `$:` blocks you may be used to if coming from <DeprecatedText />.

---

##### Understanding lifecycle

Your effects run after the component has been mounted to the DOM, and in a [microtask](href="https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide") after state changes. Re-runs are batched (i.e. changing `color` and `size` in the same moment won’t cause two separate runs), and happen after any DOM updates have been applied.

You can use `$effect` anywhere, not just at the top level of a component, as long as it is called while a parent effect is running.

Svelte uses effects internally to represent logic and expressions in your template — this is how `<h1>hello {name}!</h1>` updates when `name` changes.

An effect can return a _teardown_ function which will run immediately before the effect re-runs as seen below.

```svelte
<script lang="ts">
	let total = $state<number>(0);
	let milliseconds = $state<number>(1000);

	$effect(() => {
		// This will be recreated whenever `milliseconds` changes
		const interval = setInterval(() => {
			total += 1;
		}, milliseconds);

		return () => {
			// if a teardown function is provided, it will run
			// a) immediately before the effect re-runs
			// b) when the component is destroyed
			clearInterval(interval);
		};
	});
</script>

<h1>{total}</h1>

<button onclick={() => (milliseconds *= 2)}>slower</button>
<button onclick={() => (milliseconds /= 2)}>faster</button>
```

Teardown functions also run when the effect is destroyed, which happens when its parent is destroyed (for example, a component is unmounted) or the parent effect re-runs.

##### Understanding dependencies

`$effect` automatically picks up any reactive values `($state`, `$derived`, `$props`) that are _synchronously_ read inside its function body (including indirectly, via function calls) and registers them as dependencies. When those dependencies change, the `$effect` schedules a re-run.

If `$state` and `$derived` are used directly inside the `$effect` (for example, during creation of a [reactive class](/docs/svelte/state#classes)), those values will _not_ be treated as dependencies.

Values that are read _asynchronously_ — after an `await` or inside a `setTimeout`, for example — will not be tracked. Here, the canvas will be repainted when `color` changes, but not when `size` changes:

```ts
$effect(() => {
	const context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);

	// this will re-run whenever `color` changes...
	context.fillStyle = color;

	setTimeout(() => {
		// ...but not when `size` changes
		context.fillRect(0, 0, size, size);
	}, 0);
});
```

An effect only reruns when the object it reads changes, not when a property inside it changes. (If you want to observe changes inside an object at dev time, you can use [`$inspect`](/docs/svelte/inspect).)

```svelte
<script lang="ts">
	let total = $state<{ value: number }>({ value: 0 });

	const totalDoubled = $derived<{ value: number }>({ value: total.value * 2 });

	// this will run once, because `total` is never reassigned (only mutated)
	$effect(() => {
		total;
	});

	// this will run whenever `total.value` changes...
	$effect(() => {
		total.value;
	});

	// ...and so will this, because `totalDoubled` is a new object each time
	$effect(() => {
		totalDoubled;
	});
</script>

<button onclick={() => (total.value += 1)}>
	{total.value}
</button>

<p>{total.value} doubled is {totalDoubled.value}</p>
```

An effect only depends on the values that it read the last time it ran. This has interesting implications for effects that have conditional code.

For instance, if `condition` is `true` in the code snippet below, the code inside the `if` block will run and `color` will be evaluated. As such, changes to either `condition` or `color` will cause the effect to re-run.

Conversely, if `condition` is `false`, `color` will not be evaluated, and the effect will _only_ re-run again when `condition` changes.

```ts
import confetti from 'canvas-confetti';

let condition = $state<boolean>(true);
let color = $state<string>('#ff3e00');

$effect(() => {
	if (condition) {
		confetti({ colors: [color] });
	} else {
		confetti();
	}
});
```

<H3 id="effect-pre">$effect.pre</H3>

In rare cases, you may need to run code before the DOM updates. For this we can use the `$effect.pre` rune:

```svelte
<script lang="ts">
	import { tick } from 'svelte';

	let div = $state<HTMLDivElement | null>(null);
	let messages = $state<string[]>([]);

	// ...

	$effect.pre(() => {
		if (!div) return; // not yet mounted

		// reference `messages` array length so that this code re-runs whenever it changes
		messages.length;

		// autoscroll when new messages are added
		if (div.offsetHeight + div.scrollTop > div.scrollHeight - 20) {
			tick().then(() => {
				div.scrollTo(0, div.scrollHeight);
			});
		}
	});
</script>

<div bind:this={div}>
	{#each messages as message}
		<p>{message}</p>
	{/each}
</div>
```

Apart from the timing, `$effect.pre` works exactly like `$effect`.

<H3 id="effect-tracking">$effect.tracking</H3>

The `$effect.tracking` rune is an advanced feature that tells you whether or not the code is running inside a tracking context, such as an effect or inside your template:

```svelte
<script lang="ts">
	console.log('in component setup:', $effect.tracking()); // false

	$effect(() => {
		console.log('in effect:', $effect.tracking()); // true
	});
</script>

<p>in template: {$effect.tracking()}</p> <!-- true -->
```

It is used to implement abstractions like [`createSubscriber`](/docs/svelte/svelte-reactivity#createsubscriber), which will create listeners to update reactive values but _only_ if those values are being tracked (rather than, for example, read inside an event handler).

<H3 id="effect-root">$effect.root</H3>

The `$effect.root` rune is an advanced feature that creates a non-tracked scope that doesn’t auto-cleanup. This is useful for nested effects that you want to manually control. This rune also allows for the creation of effects outside of the component initialisation phase.

```ts
const destroy = $effect.root(() => {
	$effect(() => {
		// setup
	});

	return () => {
		// cleanup
	};
});

// later...
destroy();
```

### When not to use $effect

In general, `$effect` is best considered something of an escape hatch — useful for things like analytics and direct DOM manipulation — rather than a tool you should use frequently. In particular, avoid using it to synchronise state. Instead of this...

```svelte
<script lang="ts">
	let total = $state<number>(0);
	let totalDoubled = $state<number>(0);

	// don't do this!
	$effect(() => {
		totalDoubled = total * 2;
	});
</script>
```

...do this:

```svelte
<script>
	let total = $state<number>(0);
	let totalDoubled = $derived<number>(total * 2);
</script>
```

For things that are more complicated than a simple expression like `total * 2`, you can also use `$derived.by`.

If you’re using an effect because you want to be able to reassign the derived value (to build an optimistic UI, for example) note that [deriveds can be directly overridden](/docs/svelte/derived#overriding-derived-values) as of Svelte **5.25**.

You might be tempted to do something convoluted with effects to link one value to another. The following example shows two inputs for “money spent” and “money left” that are connected to each other. If you update one, the other should update accordingly. Don’t use effects for this:

```svelte
<script lang="ts">
	let total: number = 100;

	let spent = $state<number>(0);
	let left = $state<number>(total);

	$effect(() => {
		left = total - spent;
	});

	$effect(() => {
		spent = total - left;
	});
</script>

<label>
	<input
		type="range"
		bind:value={spent}
		max={total}
	/>
	{spent}/{total} spent
</label>

<label>
	<input
		type="range"
		bind:value={left}
		max={total}
	/>
	{left}/{total} left
</label>
```

Instead, use `oninput` callbacks or — better still — [function bindings](/docs/svelte/bind#function-bindings) where possible:

```svelte
<script lang="ts">
	let total: number = 100;

	let spent = $state<number>(0);
	let left = $state<number>(total);

	function updateSpent(newSpent: number) {
		spent = newSpent;
		left = total - spent;
	}

	function updateLeft(newLeft: number) {
		left = newLeft;
		spent = total - left;
	}
</script>

<label>
	<input
		bind:value={() => spent, updateSpent}
		type="range"
		max={total}
	/>
	{spent}/{total} spent
</label>

<label>
	<input
		bind:value={() => left, updateLeft}
		type="range"
		max={total}
	/>
	{left}/{total} left
</label>
```

If you absolutely have to update `$state` within an effect and run into an infinite loop because you read and write to the same `$state`, use [`untrack`](/docs/svelte/svelte#untrack).
