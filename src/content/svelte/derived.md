---
title: $derived
description: The $derived rune in Svelte 5 is used to create reactive values that update automatically when their dependencies change. It’s ideal for expressing computed values based on $state without needing manual updates. This page covers how $derived works, how dependencies are tracked, and how it behaves differently from $state.
category: Runes
order: 7
linksOnThisPage:
    derived-by: $derived.by
    understanding-dependencies: Understanding dependencies
    overriding-derived-values: Overriding derived values
    deriveds-and-reactivity: Deriveds and reactivity
    update-propagation: Update propagation
prevPath:
    state: $state
nextPath:
    effect: $effect
---

<script lang="ts">
    import H3 from '$lib/components/markdown/h3.svelte';
</script>

Derived state is declared with the `$derived` rune:

```svelte
<script lang="ts">
	let total = $state<number>(0);

	const totalDoubled = $derived<number>(total * 2);
</script>

<button onclick={(): void => (total += 1)}>
	{totalDoubled}
</button>

<p>{total} doubled is {totalDoubled}</p>
```

The expression inside `$derived(...)` should be free of side-effects. Svelte will disallow state changes (e.g. `total += 1`) inside derived expressions.

As with `$state`, you can mark class fields as `$derived`.

Code in Svelte components is only executed once at creation. Without the `$derived` rune, `doubled` would maintain its original value even when `total` changes.

<H3 id="derived-by">$derived.by</H3>

Sometimes you need to create complex derivations that don’t fit inside a short expression. In these cases, you can use `$derived.by` which accepts a function as its argument.

```svelte
<script lang="ts">
	let numbers = $state<number[]>([1, 2, 3]);

	const total = $derived.by<number>(() => {
		let total: number = 0;

		for (const num of numbers) {
			total += num;
		}

		return total;
	});
</script>

<button onclick={(): void => numbers.push(numbers.length + 1)}>
	{numbers.join(' + ')} = {total}
</button>
```

In essence, `$derived(expression)` is equivalent to `$derived.by(() => expression)`.

### Understanding dependencies

Anything read synchronously inside the `$derived` expression (or `$derived.by` function body) is considered a _dependency_ of the derived state. When the state changes, the derived will be marked as _dirty_ and recalculated when it is next read.

To exempt a piece of state from being treated as a dependency, use [`untrack`](/docs/svelte/svelte#untrack).

### Overriding derived values

Derived expressions are recalculated when their dependencies change, but you can temporarily override their values by reassigning them (unless they are declared with `const`). This can be useful for things like _optimistic UI_, where a value is derived from the ‘source of truth’ (such as data from your server) but you’d like to show immediate feedback to the user:

```svelte
<script lang="ts">
	let { post, like }: { post: { likes: number }; like: () => Promise<void> } = $props();

	let likes = $derived<number>(post.likes);

	async function onclick(): Promise<void> {
		// increment the `likes` count immediately...
		likes += 1;

		// and tell the server, which will eventually update `post`
		try {
			await like();
		} catch {
			// failed! roll back the change
			likes -= 1;
		}
	}
</script>

<button {onclick}>🧡 {likes}</button>
```

Prior to **Svelte 5.25**, deriveds were read-only.

---

### Deriveds and reactivity

Unlike `$state`, which converts objects and arrays to [deeply reactive proxies](/docs/svelte/state#deep-state), `$derived` values are left as-is. For example in a case like you can see below you can change (or `bind:` to) properties of `selectedItem` and it will affect the underlying `items` array. If `items` was _not_ deeply reactive, mutating `selectedItem` would have no effect.

```ts
let items = $state<string[]>([...]);
let index = $state<number>(0);

const selectedItem = $derived<string>(items[index]);
```

### Update propagation

Svelte uses something called _push-pull reactivity_ — when state is updated, everything that depends on the state (whether directly or indirectly) is immediately notified of the change (the ‘push’), but derived values are not re-evaluated until they are actually read (the ‘pull’).

If the new value of a derived is referentially identical to its previous value, downstream updates will be skipped. In other words, Svelte will only update the text inside the button when `isLarge` changes, not when `total` changes, even though `isLarge` depends on `total`:

```svelte
<script lang="ts">
	let total = $state<number>(0);

	const isLarge = $derived<boolean>(count > 10);
</script>

<button onclick={(): void => (total += 1)}>
	{isLarge}
</button>
```
