<script lang="ts">
	import * as Breadcrumb from '../ui/breadcrumb';

	type Props = { title: string; kit?: boolean };

	let { title, kit = false }: Props = $props();
</script>

<Breadcrumb.Root class="pb-2">
	<Breadcrumb.List class="sm:gap-1">
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Link href={kit ? 'docs/kit' : 'docs/svelte'}>
				{kit ? 'SvelteKit' : 'Svelte'}
			</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Page class="font-medium">{title}</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>
