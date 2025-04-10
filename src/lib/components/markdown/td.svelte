<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLTdAttributes } from 'svelte/elements';

	type TableDataCellProps = WithElementRef<HTMLTdAttributes, HTMLTableCellElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: TableDataCellProps = $props();
</script>

<td
	bind:this={ref}
	class={cn(
		'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</td>
