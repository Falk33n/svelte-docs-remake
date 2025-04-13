<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<ul
	bind:this={ref}
	class={cn('my-6 ml-6 list-inside list-disc', className)}
	{...restProps}
>
	{@render children?.()}
</ul>
