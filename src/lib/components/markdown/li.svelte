<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLLiAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLLiAttributes, HTMLLIElement>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<li
	bind:this={ref}
	class={cn('mt-2', className)}
	{...restProps}
>
	{@render children?.()}
</li>
