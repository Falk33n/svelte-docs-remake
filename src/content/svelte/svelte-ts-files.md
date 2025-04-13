---
title: .svelte.ts files
description: .svelte.ts files let you use runes in regular modules, making it easy to share reactive logic or state outside of components.
category: Introduction
order: 4
prevPath:
    svelte-files: .svelte files
nextPath:
    what-are-runes: What are runes?
---

<script lang="ts">
    import DeprecatedHeading from '$lib/components/markdown/deprecated-heading.svelte';
</script>

Besides `.svelte` files, Svelte also operates on `.svelte.ts` files.

These behave like any other `.ts` module, except that you can use runes. This is useful for creating reusable reactive logic, or sharing reactive state across your app (though note that you [cannot export reassigned state](/docs/svelte/$state#passing-state-across-modules)).

In the next chapter, we’ll explore what runes are and how they work in Svelte.

<DeprecatedHeading />

This is a concept that didn’t exist prior to **Svelte 5**.
