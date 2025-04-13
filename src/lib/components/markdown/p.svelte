<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<p
	bind:this={ref}
	class={cn('leading-7 [&:not(:first-child)]:mt-4', className)}
	{...restProps}
>
	{@render children?.()}
</p>
