<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import * as HTMLElement from '../markdown';
	import DocsListItem from './docs-list-item.svelte';

	type Props = {
		href: string;
		text: string;
		activeLink?: { current: string };
		handleActiveLinkChange?: (href: string) => void;
		onclick?: HTMLAnchorAttributes['onclick'];
		class?: string;
	};

	let {
		activeLink = $bindable({ current: '' }),
		class: className,
		text,
		href,
		handleActiveLinkChange,
		onclick,
	}: Props = $props();
</script>

<DocsListItem class="mt-0">
	<HTMLElement.a
		href={`#${href}`}
		aria-describedby="on-this-page"
		class={cn(
			'no-underline hover:underline',
			activeLink.current === href && 'text-primary underline',
			className,
		)}
		onclick={(e) => {
			handleActiveLinkChange?.(href);
			onclick?.(e);
		}}
	>
		{text}
	</HTMLElement.a>
</DocsListItem>
