<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import * as HTMLElement from '../markdown';
	import DocsListItem from './docs-list-item.svelte';

	type Props = {
		href: string;
		text: string;
		category: string;
		isSvelteKit?: boolean;
	};

	let { text, href, category, isSvelteKit = false }: Props = $props();

	const startPath = $derived(`/docs/${isSvelteKit ? 'kit' : 'svelte'}`);
	const isCurrentPath = $derived.by(() => {
		const currentPath = `${startPath}/${href}`;
		return page.url.pathname.startsWith(currentPath);
	});
</script>

<DocsListItem class="mt-0 ml-0 text-base [&>span]:left-[2px]">
	<HTMLElement.a
		aria-describedby={`sidebar-category-${category.toLowerCase()}`}
		class={cn('no-underline hover:underline', isCurrentPath && 'text-primary underline')}
		href={`${startPath}/${href}`}
	>
		{text}
	</HTMLElement.a>
</DocsListItem>
