<script
	lang="ts"
	module
>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type PreProps = WithElementRef<HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import CopyButton from './copy-button.svelte';

	let { ref = $bindable(null), class: className, children, ...restProps }: PreProps = $props();

	let code = $state('');

	onMount(() => {
		if (ref) {
			code = ref.innerText.trim().replaceAll('  ', ' ');
		}
	});
</script>

<pre
	bind:this={ref}
	class={cn(
		'selection:bg-background selection:text-foreground my-4 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-900 px-2 py-6',
		className,
	)}
	{...restProps}>
	{@render children?.()}


</pre>

<CopyButton
	text={code}
	class={cn('pre-copy-btn absolute top-6 right-6')}
/>
