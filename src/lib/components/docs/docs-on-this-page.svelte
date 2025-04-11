<script lang="ts">
	import * as HTMLElement from '$lib/components/markdown';
	import { capitalizeDocsTitleLink } from '$lib/utils';

	type Props = { links?: Record<string, string>; title: string };

	let { title, links }: Props = $props();

	const capitalizedTitle = $derived(capitalizeDocsTitleLink(title));
</script>

<aside>
	<nav class="space-y-2 pr-12 pl-4">
		<HTMLElement.h4
			class="mt-0 text-xl"
			id="on-this-page"
		>
			On this page
		</HTMLElement.h4>

		<HTMLElement.ul class="m-0 list-none space-y-2">
			<HTMLElement.li class="mt-0">
				<HTMLElement.a
					href={`#${capitalizedTitle.link}`}
					aria-describedby="on-this-page"
				>
					{capitalizedTitle.text}
				</HTMLElement.a>
			</HTMLElement.li>

			{#if links}
				{#each Object.entries(links) as [key, value]}
					<HTMLElement.li class="mt-0">
						<HTMLElement.a
							href={`#${key}`}
							aria-describedby="on-this-page"
						>
							{value}
						</HTMLElement.a>
					</HTMLElement.li>
				{/each}
			{/if}
		</HTMLElement.ul>
	</nav>
</aside>
