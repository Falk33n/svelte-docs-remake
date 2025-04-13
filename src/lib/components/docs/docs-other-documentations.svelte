<script lang="ts">
	import { cn } from '$lib/utils';
	import * as HTMLElement from '../markdown';
	import { Separator } from '../ui/separator';

	type Props = {
		prevPath?: Record<string, string>;
		nextPath?: Record<string, string>;
		isSvelteKit?: boolean;
	};

	let { prevPath, nextPath, isSvelteKit = false }: Props = $props();

	const startPath = $derived(`/docs/${isSvelteKit ? 'kit' : 'svelte'}`);
</script>

<aside>
	<h4 class="sr-only">Other documentations</h4>

	<Separator />

	<div
		class={cn(
			'flex items-center gap-2 pt-4',
			!prevPath && nextPath ? 'justify-end' : 'justify-between',
		)}
	>
		{#if prevPath}
			<span
				class="text-muted-foreground font-medium uppercase"
				aria-label="Previous page"
				id="previous-page"
			>
				Previous
			</span>
		{/if}

		{#if nextPath}
			<span
				class="text-muted-foreground font-medium uppercase"
				aria-label="Next page"
				id="next-page"
			>
				Next
			</span>
		{/if}
	</div>

	<div
		class={cn(
			'flex items-center gap-2 pt-1',
			!prevPath && nextPath ? 'justify-end' : 'justify-between',
		)}
	>
		{#if prevPath}
			{@const [key, value] = Object.entries(prevPath)[0]}

			<HTMLElement.a
				href={`${startPath}/${key}`}
				aria-describedby="previous-page"
				class="text-primary text-left no-underline hover:underline"
			>
				{value}
			</HTMLElement.a>
		{/if}

		{#if nextPath}
			{@const [key, value] = Object.entries(nextPath)[0]}

			<HTMLElement.a
				href={`${startPath}/${key}`}
				aria-describedby="next-page"
				class="text-primary text-right no-underline hover:underline"
			>
				{value}
			</HTMLElement.a>
		{/if}
	</div>
</aside>
