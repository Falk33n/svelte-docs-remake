---
title: $state
description: This page explains Svelte's $state rune, enabling intuitive reactive state management. $state works with plain values, supports deep reactivity for arrays and objects, and offers tools like $state.raw and $state.snapshot for performance and API integration. It also discusses handling state in functions, classes, and across modules.
category: Runes
order: 6
linksOnThisPage:
    state-raw: $state.raw
    state-snapshot: $state.snapshot
    passing-state-into-functions: Passing state into functions
    passing-state-across-modules: Passing state across modules
prevPath:
    what-are-runes: What are runes?
nextPath:
    derived: $derived
---

<script lang="ts">
    import H3 from '$lib/components/markdown/h3.svelte';
</script>

The `$state` rune allows you to create _reactive state_, which means that your UI _reacts_ when it changes.

```svelte
<script lang="ts">
	let totalClicks = $state<number>(0);
</script>

<button onclick={(): void => (totalClicks += 1)}>
	clicks: {totalClicks}
</button>
```

Unlike other frameworks you may have encountered, there is no API for interacting with state — `totalClicks` is just a number, rather than an object or a function, and you can update it like you would update any other variable.

##### Deep state

If `$state` is used with an array or a simple object, the result is a deeply reactive _state proxy_. [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) allow Svelte to run code when you read or write properties, including via methods like `array.push(...)`, triggering granular updates.

Classes like `Set` and `Map` will not be proxied, but Svelte provides reactive implementations for various built-ins like these that can be imported from [`svelte/reactivity`](/docs/svelte/svelte-reactivity).

State is proxified recursively until Svelte finds something other than an array or simple object. In a case like this...

```ts
let todos = $state<{ done: boolean; task: string }[]>([
	{
		done: false,
		task: 'add more todos',
	},
]);
```

...modifying an individual todo’s property will trigger updates to anything in your UI that depends on that specific property:

```ts
todos[0].done = !todos[0].done;
```

If you push a new object to the array, it will also be proxified:

```ts
todos.push({
	done: false,
	task: 'eat lunch',
});
```

When you update properties of proxies, the original object is _not_ mutated.

Note that if you destructure a reactive value, the references are not reactive — as in normal JavaScript, they are evaluated at the point of destructuring:

```ts
let {( done, task )} = todos[0]; // this will not affect the value of `done` todos[0].done = !todos[0].done;
```

##### Classes

You can also use `$state` in class fields (whether public or private):

```ts
class Todo {
	done = $state<boolean>(false);
	task = $state<string>();

	constructor(task: string): void {
		this.task = task;
	}

	reset(): void {
		this.task = '';
		this.done = false;
	}
}
```

The compiler transforms `done` and `task` into `get` / `set` methods on the class prototype referencing private fields. This means the properties are not enumerable.

When calling methods in JavaScript, the value of [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) matters. This won’t work, because `this` inside the `reset` method will be the `<button>` rather than the `Todo`:

```svelte
<button onclick={todo.reset}>reset</button>
```

You can either use an inline function...

```svelte
<button onclick={(): void => todo.reset()}>reset</button>
```

...or use an arrow function in the class definition:

```ts
class Todo {
	done = $state<boolean>(false);
	task = $state<string>();

	constructor(task: string): void {
		this.task = task;
	}

	reset = (): void => {
		this.task = '';
		this.done = false;
	};
}
```

<H3 id="state-raw">$state.raw</H3>

In cases where you don’t want objects and arrays to be deeply reactive you can use `$state.raw`.

State declared with `$state.raw` cannot be mutated; it can only be _reassigned_. In other words, rather than assigning to a property of an object, or using an array method like `push`, replace the object or array altogether if you’d like to update it:

```ts
let person = $state.raw<{ name: string; age: number }>({
	name: 'Heraclitus',
	age: 49,
});

// this will have no effect
person.age += 1;

// this will work, because we're creating a new person
person = {
	name: 'Heraclitus',
	age: 50,
};
```

This can improve performance with large arrays and objects that you weren’t planning to mutate anyway, since it avoids the cost of making them reactive. Note that raw state can _contain_ reactive state (for example, a raw array of reactive objects).

<H3 id="state-snapshot">$state.snapshot</H3>

To take a static snapshot of a deeply reactive `$state proxy`, use `$state.snapshot`:

```svelte
<script lang="ts">
	let counter = $state<{ count: number }>({ count: 0 });

	function onclick(): void {
		// Will log `{ count: ... }` rather than `Proxy { ... }`
		console.log($state.snapshot(counter));
	}
</script>
```

This is handy when you want to pass some state to an external library or API that doesn’t expect a proxy, such as `structuredClone`.

### Passing state into functions

JavaScript is a _pass-by-value_ language — when you call a function, the arguments are the _values_ rather than the _variables_. In other words:

```ts
function add(num1: number, num2: number): number {
	return num1 + num2;
}

let num1: number = 1;
let num2: number = 2;
let total: number = add(num1, num2);
console.log(total); // 3

num1 = 3;
num2 = 4;
console.log(total); // still 3!
```

If `add` wanted to have access to the _current_ values of `num1` and `num2`, and to return the current `total` value, you would need to use functions instead:

```ts
function add(getNum1: () => number, getNum2: () => number): () => number {
	return () => getNum1() + getNum2();
}

let num1: number = 1;
let num2: number = 2;
let total: number = add(
	() => num1,
	() => num2,
);
console.log(total()); // 3

num1 = 3;
num2 = 4;
console.log(total()); // 7
```

State in Svelte is no different — when you reference something declared with the `$state` rune you’re accessing its _current value_ as seen below.

```ts
let num1 = $state<number>(1);
let num2 = $state<number>(2);
```

Note that ‘functions’ is broad — it encompasses properties of proxies and [`get`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) / [`set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) properties. Though if you find yourself writing code like seen below, consider using [classes](#classes) instead.

```ts
function add(numbers: { num1: number; num2: number }): { value: () => number } {
	return {
		get value(): number {
			return numbers.num1 + numbers.num2;
		},
	};
}

let numbers = $state<{ num1: number; num2: number }>({ num1: 1, num2: 2 });
let total: number = add(numbers);
console.log(total.value); // 3

numbers.num1 = 3;
numbers.num2 = 4;
console.log(total.value); // 7
```

### Passing state across modules

You can declare state in `.svelte.ts` files, but you can only _export_ that state if it’s not directly reassigned. In other words you can’t do this:

```ts
export let count = $state<number>(0);

export function increment(): void {
	count += 1;
}
```

That’s because every reference to `count` is transformed by the Svelte compiler — the code above is roughly equivalent to this:

```js
// Compiler Output (.js)

export let count = $.state(0);

export function increment() {
	$.set(count, $.get(count) + 1);
}
```

You can see the code Svelte generates by clicking the ‘JS Output’ tab in the [playground](/playground).

Since the compiler only operates on one file at a time, if another file imports `count` Svelte doesn’t know that it needs to wrap each reference in `$.get` and `$.set`:

```ts
import { count } from './state.svelte';

console.log(typeof count); // 'object', not 'number'
```

This leaves you with two options for sharing state between modules — either don’t reassign it...

```ts
// This is allowed — since we're updating
// `counter.count` rather than `counter`,
// Svelte doesn't wrap it in `$.state`
export const counter = $state<{ count: number }>({
	count: 0,
});

export function increment(): void {
	counter.count += 1;
}
```

...or don’t directly export it:

```ts
let count = $state<number>(0);

export function getCount(): number {
	return count;
}

export function increment(): void {
	count += 1;
}
```
