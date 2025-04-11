<script lang="ts">
	import {
		DocsBreadcrumb,
		DocsHeading,
		DocsMarkdown,
		DocsOnThisPage,
		DocsOtherDocumentations,
	} from '$lib/components/docs';
	import { IsLaptop } from '$lib/hooks/media-queries.svelte';
	import { capitalize } from '$lib/utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const metadata = $derived(data.metadata);

	const currentPath = $derived.by(() => {
		const directories = metadata.slugFull.split('/');
		const currentDirectory = directories[directories.length - 1];
		return capitalize(currentDirectory);
	});

	const isSvelteKit = $derived.by(() => {
		const svelteDirectory = metadata.slugFull.split('/')[1];
		return svelteDirectory !== 'svelte';
	});

	const isLaptop = $derived(new IsLaptop().current);
</script>

<svelte:head>
	<title>{currentPath} | Docs | {isSvelteKit ? 'SvelteKit' : 'Svelte'}</title>
	<meta
		name="description"
		content={metadata.description}
	/>
</svelte:head>

<div class="px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
	<DocsBreadcrumb
		title={metadata.title}
		{isSvelteKit}
	/>

	<main class="py-0 lg:gap-8 xl:grid xl:grid-cols-[1fr_200px] xl:pr-12">
		<div>
			<DocsHeading
				title={data.title}
				description={metadata.description}
			/>

			<DocsMarkdown
				component={data.component}
				path={metadata.path}
			/>

			<DocsOtherDocumentations
				prevPath={metadata.prevPath}
				nextPath={metadata.nextPath}
				{isSvelteKit}
			/>
		</div>

		{#if isLaptop}
			<DocsOnThisPage
				title={data.title}
				links={metadata.links}
			/>
		{/if}
	</main>
</div>
