<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLOlAttributes } from 'svelte/elements';

	type OrderedListProps = WithElementRef<HTMLOlAttributes, HTMLOListElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: OrderedListProps = $props();
</script>

<ol
	bind:this={ref}
	class={cn('my-6 ml-6 list-decimal', className)}
	{...restProps}
>
	{@render children?.()}
</ol>
