<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLImgAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLImgAttributes, HTMLImageElement>;

	let { ref = $bindable(null), class: className, src, alt, ...restProps }: Props = $props();
</script>

<img
	bind:this={ref}
	{src}
	{alt}
	class={cn('rounded-md', className)}
	{...restProps}
/>
