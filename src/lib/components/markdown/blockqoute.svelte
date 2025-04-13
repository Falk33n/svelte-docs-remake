<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLBlockquoteAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLBlockquoteAttributes, HTMLQuoteElement>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<blockquote
	bind:this={ref}
	class={cn('mt-6 border-l-2 pl-6 italic', className)}
	{...restProps}
>
	{@render children?.()}
</blockquote>
