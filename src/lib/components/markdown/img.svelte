<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLImgAttributes } from 'svelte/elements';

	type ImageProps = WithElementRef<HTMLImgAttributes, HTMLImageElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let { ref = $bindable(null), class: className, src, alt, ...restProps }: ImageProps = $props();
</script>

<img
	bind:this={ref}
	{src}
	{alt}
	class={cn('rounded-md', className)}
	{...restProps}
/>
