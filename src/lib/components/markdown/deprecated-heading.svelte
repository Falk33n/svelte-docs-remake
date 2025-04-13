<script lang="ts">
	import { cn } from '$lib/utils';
	import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

	let { ref = $bindable(null), class: className, ...restProps }: Props = $props();
</script>

<h5
	bind:this={ref}
	class={cn(
		'mt-5 flex scroll-m-20 items-center gap-1.5 text-lg font-semibold tracking-tight',
		className,
	)}
	aria-label="Svelte 4, the following information is deprecated"
	{...restProps}
>
	<TriangleAlertIcon
		class="text-primary size-5"
		aria-hidden
	/>

	<span class="whitespace-nowrap">Svelte 4</span>

	<span class="text-muted-foreground text-sm font-medium tracking-wide">(Deprecated)</span>
</h5>
