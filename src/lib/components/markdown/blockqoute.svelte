<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLBlockquoteAttributes } from 'svelte/elements';

	type BlockquoteProps = WithElementRef<HTMLBlockquoteAttributes, HTMLQuoteElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: BlockquoteProps = $props();
</script>

<blockquote
	bind:this={ref}
	class={cn('mt-6 border-l-2 pl-6 italic', className)}
	{...restProps}
>
	{@render children?.()}
</blockquote>
