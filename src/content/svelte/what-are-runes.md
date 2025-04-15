---
title: What are runes?
description: Runes are a new syntax in Svelte 5 for controlling reactivity. They look like special functions with a $ prefix, but behave more like language keywords. This page explains what runes are, how they work, and why they're useful in Svelte.
category: Runes
order: 5
prevPath:
    svelte-ts-files: .svelte.ts files
nextPath:
    state: $state
---

<script lang="ts">
    import DeprecatedHeading from '$lib/components/markdown/deprecated-heading.svelte';
</script>

A rune is an ancient symbol once believed to hold magical or mystical power, used in writing and rituals.

But runes are also symbols that you use in `.svelte` and `.svelte.ts` files to control the Svelte compiler. If you think of Svelte as a language, runes are part of the syntax — they are _keywords_.

Runes have a `$` prefix and look like functions:

```ts
let message = $state<string>('hello');
```

They differ from normal JavaScript functions in important ways, however:

- You don’t need to import them — they are part of the language
- They’re not values — you can’t assign them to a variable or pass them as arguments to a function
- Just like JavaScript keywords, they are only valid in certain positions (the compiler will help you if you put them in the wrong place)

<DeprecatedHeading />

Runes didn’t exist prior to <strong>Svelte 5</strong>.
