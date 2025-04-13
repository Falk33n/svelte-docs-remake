---
title: .svelte files
description: Components in Svelte are self-contained units of functionality written in .svelte files. They combine logic, markup, and styles into a single file, making development intuitive and modular.
category: Introduction
order: 3
linksOnThisPage:
    script: <script>
    script-module: <script module>
    style: <style>
prevPath:
    getting-started: Getting Started
nextPath:
    svelte-ts-files: .svelte.ts files
---

<script lang="ts">
    import DeprecatedHeading from '$lib/components/markdown/deprecated-heading.svelte';
    import DeprecatedText from '$lib/components/markdown/deprecated-text.svelte';
</script>

Components are the building blocks of Svelte applications. They are written into `.svelte` files, using a superset of HTML.

All three sections — script, styles and markup — are optional.

<!-- prettier-ignore -->
```svelte
<script lang="ts" module>
	// module-level logic goes here
</script>

<script lang="ts">
	// instance-level logic goes here
</script>

<!-- markup (zero or more items) goes here -->

<style>
	/* styles go here */
</style>
```

### &lt;script&gt;

A `<script lang="ts">` block contains TypeScript, when adding the `lang="ts"` attribute that runs when a component instance is created. Variables declared (or imported) at the top level can be referenced in the component’s markup.

In addition to normal JavaScript, you can use runes to declare [component props](/docs/svelte/$props) and add reactivity to your component. Runes are covered in the next section.

### &lt;script module&gt;

A `<script lang="ts">` tag with a `module` attribute runs once when the module first evaluates, rather than for each component instance. Variables declared in this block can be referenced elsewhere in the component, but not vice versa.

<!-- prettier-ignore -->
```svelte
<script lang="ts" module>
	let total: number = 0;
</script>

<script lang="ts">
	total += 1;
	console.log(`instantiated ${total} times`);
</script>
```

You can `export` bindings from this block, and they will become exports of the compiled module. You cannot `export default`, since the default export is the component itself.

When using TypeScript and import such exports from a module block into a .ts file, make sure to have your editor setup so that TypeScript knows about them. This is the case for our VS Code extension and the IntelliJ plugin, but in other cases you might need to setup our [TypeScript editor plugin](https://www.npmjs.com/package/typescript-svelte-plugin).

<DeprecatedHeading />

In <DeprecatedText />, this script tag was created using `<script lang="ts" context="module">`. But <strong>Svelte 5</strong> simplifies this — now you can just write `<script lang="ts" module>`

---

### &lt;style&gt;

CSS inside a `<style>` block will be scoped to that component.

```svelte
<style>
	p {
		/* this will only affect <p> elements in this component */
		color: burlywood;
	}
</style>
```

For more information, head to the section on [styling](/docs/svelte/scoped-styles).
