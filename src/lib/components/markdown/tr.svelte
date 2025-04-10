<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type TableRowProps = WithElementRef<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: TableRowProps = $props();
</script>

<tr
	bind:this={ref}
	class={cn('m-0 border-t', className)}
	{...restProps}
>
	{@render children?.()}
</tr>
