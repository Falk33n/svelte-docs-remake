<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLLiAttributes } from 'svelte/elements';

	type ListItemProps = WithElementRef<HTMLLiAttributes, HTMLLIElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ListItemProps = $props();
</script>

<li
	bind:this={ref}
	class={cn('mt-2', className)}
	{...restProps}
>
	{@render children?.()}
</li>
