<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<h1
	bind:this={ref}
	class={cn('mt-2 scroll-m-20 text-4xl font-bold', className)}
	{...restProps}
>
	{@render children?.()}
</h1>
