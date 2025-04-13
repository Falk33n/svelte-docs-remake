<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<h5
	bind:this={ref}
	class={cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)}
	{...restProps}
>
	{@render children?.()}
</h5>
