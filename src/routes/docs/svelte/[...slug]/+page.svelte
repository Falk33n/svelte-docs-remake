<script lang="ts">
	import { DocsBreadcrumb } from '$lib/components/docs';
	import { Separator } from '$lib/components/ui/separator';
	import { cn } from '$lib/utils';
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();

	const Markdown = $derived(data.component);
	const title = $derived(data.metadata.title);
	const description = $derived(data.metadata.description);
	const links = $derived(data.metadata.links);
</script>

<main class="relative p-12 lg:gap-8">
	<DocsBreadcrumb {title} />

	<header class="space-y-4">
		<h1
			class={cn('scroll-m-20 text-4xl font-bold tracking-tight')}
			id={title}
		>
			{title}
		</h1>

		<p class="text-foreground/80 leading-6">
			{description}
		</p>

		<Separator />
	</header>

	<div
		class="markdown pt-4 pb-12"
		id="markdown"
	>
		<Markdown />
	</div>
</main>

<aside>
	<nav class="space-y-2 px-4 py-20">
		<h3 class="font-heading scroll-m-20 text-xl font-semibold tracking-tight">On this page</h3>

		{#if links}
			{#each Object.entries(links) as [key, value]}
				<a
					href={`#${key}`}
					class="font-medium underline underline-offset-2"
				>
					{value}
				</a>
			{/each}
		{/if}
	</nav>
</aside>
