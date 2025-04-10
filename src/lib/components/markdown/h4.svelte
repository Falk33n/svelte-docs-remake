<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type HeadingProps = WithElementRef<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: HeadingProps = $props();
</script>

<h4
	bind:this={ref}
	class={cn('font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)}
	{...restProps}
>
	{@render children?.()}
</h4>
