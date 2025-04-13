<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLTdAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLTdAttributes, HTMLTableCellElement>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
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
