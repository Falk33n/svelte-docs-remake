<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLDelAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLDelAttributes, HTMLElement>;

	let { ref = $bindable(null), class: className, ...restProps }: Props = $props();
</script>

<del
	bind:this={ref}
	class={cn('[text-decoration:none]', className)}
	{...restProps}
>
	Svelte 4
</del>
