<script lang="ts">
	import * as HTMLElement from '$lib/components/markdown';
	import { cn } from '$lib/utils';
	import { Separator } from '../ui/separator';

	type Props = {
		prevPath?: Record<string, string>;
		nextPath?: Record<string, string>;
		isSvelteKit?: boolean;
	};

	let { prevPath, nextPath, isSvelteKit = false }: Props = $props();
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
			'flex items-center gap-2 pt-1 pb-4',
			!prevPath && nextPath ? 'justify-end' : 'justify-between',
		)}
	>
		{#if prevPath}
			{@const [key, value] = Object.entries(prevPath)[0]}

			<HTMLElement.a
				href={`/docs/${isSvelteKit ? 'kit' : 'svelte'}/${key}`}
				aria-describedby="previous-page"
			>
				{value}
			</HTMLElement.a>
		{/if}

		{#if nextPath}
			{@const [key, value] = Object.entries(nextPath)[0]}

			<HTMLElement.a
				href={`/docs/${isSvelteKit ? 'kit' : 'svelte'}/${key}`}
				aria-describedby="next-page"
			>
				{value}
			</HTMLElement.a>
		{/if}
	</div>
</aside>
