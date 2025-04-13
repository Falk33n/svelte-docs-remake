<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<tr
	bind:this={ref}
	class={cn('m-0 border-t', className)}
	{...restProps}
>
	{@render children?.()}
</tr>
