<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type UnorderedListProps = WithElementRef<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: UnorderedListProps = $props();
</script>

<ul
	bind:this={ref}
	class={cn('my-6 ml-6 list-disc', className)}
	{...restProps}
>
	{@render children?.()}
</ul>
