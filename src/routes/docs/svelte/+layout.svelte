<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<div class="xl:grid xl:grid-cols-[400px_1fr_400px]">
	<nav></nav>

	{@render children()}
</div>
