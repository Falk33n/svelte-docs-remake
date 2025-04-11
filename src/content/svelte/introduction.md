---
title: Introduction
description: Welcome to Svelte. This page gives you a clear and friendly overview of what Svelte is, how it works, and why developers love it. Whether you're new to web development or switching from another framework, you'll find everything you need to understand the basics and get started quickly.
nextPath:
    getting-started: Getting Started
---

Svelte is a framework for building user interfaces on the web. It uses a compiler to turn declarative components written in HTML, CSS and JavaScript into lean, tightly optimized JavaScript as seen below.

```svelte
<script lang="ts">
	function greet() {
		alert('Welcome to Svelte!');
	}
</script>

<button onclick={greet}>click me</button>

<style>
	button {
		font-size: 2em;
	}
</style>
```

You can use it to build anything on the web, from standalone components to ambitious full stack apps (using Svelte’s companion application framework, [SvelteKit](/docs/kit/introduction)) and everything in between.

These pages serve as reference documentation. If you’re new to Svelte, we recommend starting with the [interactive tutorial](/tutorial/svelte/introduction) and coming back here when you have questions.

You can also try Svelte online in the [playground](/playground) or, if you need a more fully-featured environment, on [StackBlitz](https://sveltekit.new).
