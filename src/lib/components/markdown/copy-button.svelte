<script
	lang="ts"
	module
>
	// omit href so you can't create a link
	type CopyButtonProps = Omit<ButtonProps, 'href'> & {
		text: string;
		icon?: Snippet<[]>;
		animationDuration?: number;
		onCopy?: (status: UseClipboard['status']) => void;
	};
</script>

<script lang="ts">
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import { cn } from '$lib/utils';
	import CheckIcon from '@lucide/svelte/icons/check';
	import CopyIcon from '@lucide/svelte/icons/copy';
	import XIcon from '@lucide/svelte/icons/x';
	import type { Snippet } from 'svelte';
	import { scale } from 'svelte/transition';
	import { Button, type ButtonProps } from '../ui/button';

	let {
		animationDuration = 500,
		variant = 'ghost',
		class: className,
		onCopy,
		text,
		icon,
		...restProps
	}: CopyButtonProps = $props();

	const clipboard = new UseClipboard();
</script>

<Button
	{...restProps}
	{variant}
	size="icon"
	class={cn(className)}
	type="button"
	onclick={async () => {
		const status = await clipboard.copy(text);
		onCopy?.(status);
	}}
>
	{#if clipboard.status === 'success'}
		<div
			in:scale={{ duration: animationDuration, start: 0.85 }}
			aria-label="Copied"
		>
			<CheckIcon aria-hidden />
		</div>
	{:else if clipboard.status === 'failure'}
		<div
			in:scale={{ duration: animationDuration, start: 0.85 }}
			aria-label="Failed to copy"
		>
			<XIcon aria-hidden />
		</div>
	{:else}
		<div
			in:scale={{ duration: animationDuration, start: 0.85 }}
			aria-label="Copy"
		>
			{#if icon}
				{@render icon()}
			{:else}
				<CopyIcon aria-hidden />
			{/if}
		</div>
	{/if}
</Button>
