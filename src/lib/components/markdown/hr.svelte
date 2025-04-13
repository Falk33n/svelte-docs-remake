<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLHRElement>, HTMLHRElement>;

	let { ref = $bindable(null), class: className, ...restProps }: Props = $props();
</script>

<hr
	bind:this={ref}
	class={cn('my-4 md:my-8', className)}
	{...restProps}
/>
