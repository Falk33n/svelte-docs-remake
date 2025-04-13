<script lang="ts">
	import EditIcon from '@lucide/svelte/icons/edit';
	import type { Component } from 'svelte';
	import * as HTMLElement from '../markdown';

	type Props = {
		component: Component;
		path: string;
	};

	let { component, path }: Props = $props();

	const Markdown = $derived(component);
</script>

<section
	class="markdown pb-4"
	id="markdown"
>
	<h2 class="sr-only">Main documentation content</h2>

	<Markdown />

	<HTMLElement.p class="pt-6">
		<HTMLElement.a
			href={`https://github.com/Falk33n/svelte-docs-remake/edit/main/src/content/${path}.md`}
			class="text-primary inline-flex items-center gap-2 no-underline hover:underline"
			aria-label="Edit this page on GitHub, opens in a new tab"
		>
			<EditIcon
				class="size-4"
				aria-hidden
			/>
			Edit this page on GitHub
		</HTMLElement.a>
	</HTMLElement.p>
</section>
