<script lang="ts">
	import * as Breadcrumb from '../ui/breadcrumb';

	type Props = { title: string; isSvelteKit?: boolean };

	let { title, isSvelteKit = false }: Props = $props();
</script>

<Breadcrumb.Root class="pb-2">
	<Breadcrumb.List class="sm:gap-1">
		<Breadcrumb.Item>Docs</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			{isSvelteKit ? 'SvelteKit' : 'Svelte'}
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Page class="font-medium">{title}</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>
