<script lang="ts">
	import { IsLaptop } from '$lib/hooks/media-queries.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const isLaptop = $derived(new IsLaptop().current);
</script>

<div class="w-full xl:mx-auto xl:w-[1400px]">
	<div class="lg:grid lg:grid-cols-[300px_1fr]">
		<nav></nav>

		{@render children()}
	</div>
</div>
