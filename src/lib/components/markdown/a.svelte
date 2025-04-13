<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAnchorAttributes, HTMLAnchorElement>;

	let { ref = $bindable(null), class: className, children, href, ...restProps }: Props = $props();

	const internal = $derived(href?.startsWith('/') || href?.startsWith('#'));
</script>

<a
	bind:this={ref}
	class={cn(
		'hover:text-primary focus-visible:ring-sidebar-ring rounded-sm font-medium underline underline-offset-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none',
		className,
	)}
	rel={!internal ? 'noopener noreferrer' : undefined}
	target={!internal ? '_blank' : undefined}
	{href}
	{...restProps}
>
	{@render children?.()}
</a>
