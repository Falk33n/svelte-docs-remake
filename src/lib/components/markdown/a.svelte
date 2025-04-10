<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type AnchorProps = WithElementRef<HTMLAnchorAttributes, HTMLAnchorElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		href,
		...restProps
	}: AnchorProps = $props();

	const internal = $derived(href?.startsWith('/') || href?.startsWith('#'));
	const rel = $derived(!internal ? 'noopener noreferrer' : undefined);
	const target = $derived(!internal ? '_blank' : undefined);
</script>

<a
	bind:this={ref}
	class={cn('font-medium underline underline-offset-4', className)}
	{href}
	{target}
	{rel}
	{...restProps}
>
	{@render children?.()}
</a>
