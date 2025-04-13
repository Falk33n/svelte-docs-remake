<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLTableElement>, HTMLTableElement>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<div class="my-6 w-full overflow-y-auto rounded-lg">
	<table
		bind:this={ref}
		class={cn(
			'after:ring-border relative w-full overflow-hidden text-sm after:absolute after:inset-0 after:rounded-lg after:ring-1',
			className,
		)}
		{...restProps}
	>
		{@render children?.()}
	</table>
</div>
