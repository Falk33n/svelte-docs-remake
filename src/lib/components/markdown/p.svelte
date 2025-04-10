<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type ParagraphProps = WithElementRef<
		HTMLAttributes<HTMLParagraphElement>,
		HTMLParagraphElement
	>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ParagraphProps = $props();
</script>

<h6
	bind:this={ref}
	class={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
	{...restProps}
>
	{@render children?.()}
</h6>
