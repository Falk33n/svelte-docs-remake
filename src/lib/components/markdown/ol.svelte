<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLOlAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLOlAttributes, HTMLOListElement>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<ol
	bind:this={ref}
	class={cn('my-6 ml-6 list-inside list-decimal', className)}
	{...restProps}
>
	{@render children?.()}
</ol>
