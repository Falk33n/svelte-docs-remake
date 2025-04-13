<script lang="ts">
	import { page } from '$app/state';
	import { convertToHref } from '$lib/utils';
	import * as HTMLElement from '../markdown';
	import * as Accordion from '../ui/accordion';
	import DocsOnThisPageLink from './docs-on-this-page-link.svelte';

	type Props = { linksOnThisPage?: Record<string, string>; title: string };

	let { title, linksOnThisPage }: Props = $props();

	const titleAsHref = $derived(convertToHref(title));

	let rootValue = $state('');

	let prevPath = page.url.pathname;

	$effect(() => {
		if (prevPath !== page.url.pathname) {
			rootValue = '';
			prevPath = page.url.pathname;
		}
	});
</script>

<Accordion.Root
	bind:value={rootValue}
	class="xl:hidden"
	type="single"
>
	<Accordion.Item>
		<Accordion.Trigger class="data-[state=open]:border-b">On this page</Accordion.Trigger>

		<Accordion.Content class="pt-4 text-base">
			<HTMLElement.ol class="m-0 list-inside space-y-4">
				<DocsOnThisPageLink
					class="underline"
					href={titleAsHref}
					text={title}
					onclick={() => (rootValue = '')}
				/>

				{#if linksOnThisPage}
					{#each Object.entries(linksOnThisPage) as [key, value]}
						<DocsOnThisPageLink
							class="underline"
							href={key}
							text={value}
							onclick={() => (rootValue = '')}
						/>
					{/each}
				{/if}
			</HTMLElement.ol>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
