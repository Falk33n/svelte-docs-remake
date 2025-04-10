<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLThAttributes } from 'svelte/elements';

	type TableHeadingCellProps = WithElementRef<HTMLThAttributes, HTMLTableCellElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: TableHeadingCellProps = $props();
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
