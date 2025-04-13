<script lang="ts">
	import * as HTMLElement from '../markdown';
	import * as Sidebar from '../ui/sidebar';
	import DocsSidebarLink from './docs-sidebar-link.svelte';

	type Props = {
		sidebarLinks: Record<string, { title: string; href: string }[]>;
		isSvelteKit?: boolean;
	};

	let { sidebarLinks, isSvelteKit = false }: Props = $props();
</script>

<Sidebar.Root
	class="border-r-sidebar-border sticky top-0 h-screen border-r px-6 pt-24 pb-16"
	collapsible="none"
	aria-label="Sidebar"
>
	<Sidebar.Content
		class="gap-0 space-y-6"
		aria-label="Navigation links sorted by category"
		id="sidebar-content"
	>
		{#each Object.entries(sidebarLinks) as [category, links]}
			<Sidebar.Group class="space-y-3 p-0">
				<Sidebar.GroupLabel
					class="font-heading text-sidebar-foreground px-0 text-xl"
					id={`sidebar-category-${category.toLowerCase()}`}
					aria-describedby="sidebar-content"
				>
					{category}
				</Sidebar.GroupLabel>

				<Sidebar.GroupContent>
					<HTMLElement.ol class="m-0 list-none space-y-3">
						{#each links as { title, href }}
							<DocsSidebarLink
								text={title}
								{isSvelteKit}
								{category}
								{href}
							/>
						{/each}
					</HTMLElement.ol>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
</Sidebar.Root>
