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

<h2
	bind:this={ref}
	class={cn(
		'font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</h2>
