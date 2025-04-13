<script lang="ts">
	import { DocsSidebar } from '$lib/components/docs';
	import { SidebarProvider } from '$lib/components/ui/sidebar';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	const isSvelteKit = $derived(data.isSvelteKit);
</script>

<div class="w-full xl:mx-auto xl:max-w-[1500px]">
	<div class="lg:grid lg:grid-cols-[240px_1fr]">
		<SidebarProvider>
			<DocsSidebar
				sidebarLinks={data.sidebarLinks}
				{isSvelteKit}
			/>
		</SidebarProvider>

		{@render children()}
	</div>
</div>
