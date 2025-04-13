<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLThAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLThAttributes, HTMLTableCellElement>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<th
	bind:this={ref}
	class={cn(
		'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</th>
