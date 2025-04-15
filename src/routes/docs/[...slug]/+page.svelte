<script lang="ts">
	import {
		DocsBreadcrumb,
		DocsHeading,
		DocsMarkdown,
		DocsOnThisPage,
		DocsOnThisPageAccordion,
		DocsOtherDocumentations,
	} from '$lib/components/docs';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const metadata = $derived(data.metadata);
	const isSvelteKit = $derived(data.isSvelteKit);
</script>

<svelte:head>
	<title>{data.title} | Docs | {isSvelteKit ? 'SvelteKit' : 'Svelte'}</title>
	<meta
		name="description"
		content={metadata.description}
	/>
</svelte:head>

<div
	class="bg-background border-r-sidebar-border border-r px-4 pt-12 pb-28 sm:px-6 md:pb-12 lg:px-12 lg:py-16 2xl:pr-0"
>
	<DocsBreadcrumb
		title={metadata.title}
		{isSvelteKit}
	/>

	<main class="lg:gap-8 xl:grid xl:grid-cols-[1fr_320px]">
		<DocsOnThisPage
			linksOnThisPage={metadata.linksOnThisPage}
			title={data.title}
		/>

		<div class="order-1">
			<DocsHeading
				description={metadata.description}
				title={data.title}
			/>

			<DocsOnThisPageAccordion
				linksOnThisPage={metadata.linksOnThisPage}
				title={data.title}
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
	</main>
</div>
