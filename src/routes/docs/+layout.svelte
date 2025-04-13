<script lang="ts">
	import DocsSidebar from '$lib/components/docs/docs-sidebar.svelte';
	import SidebarProvider from '$lib/components/ui/sidebar/sidebar-provider.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	const isSvelteKit = $derived(data.isSvelteKit);
</script>

<div class="bg-background md:bg-sidebar w-full">
	<div class="w-full xl:mx-auto xl:max-w-[1500px]">
		<div class="md:grid md:grid-cols-[240px_1fr]">
			<SidebarProvider class="hidden md:block">
				<DocsSidebar
					sidebarLinks={data.sidebarLinks}
					{isSvelteKit}
				/>
			</SidebarProvider>

			{@render children()}

			<nav
				class="bg-sidebar border-t-sidebar-border fixed bottom-0 flex h-16 w-full border-t md:hidden"
			>
				future mobile navbar
			</nav>
		</div>
	</div>
</div>
