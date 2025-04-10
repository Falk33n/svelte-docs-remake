<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type HorizontalRuleProps = WithElementRef<HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let { ref = $bindable(null), class: className, ...restProps }: HorizontalRuleProps = $props();
</script>

<hr
	bind:this={ref}
	class={cn('my-4 md:my-8', className)}
	{...restProps}
/>
