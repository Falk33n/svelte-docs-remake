<script lang="ts">
	import * as HTMLElement from '$lib/components/markdown';
	import { Separator } from '../ui/separator';

	type Props = {
		title: string;
		description: string;
	};

	let { title, description }: Props = $props();
</script>

<header class="space-y-4">
	<HTMLElement.h1
		class="mt-0 scroll-mt-40"
		id={title}
	>
		{title}
	</HTMLElement.h1>

	<HTMLElement.p class="text-foreground/80">
		{description}
	</HTMLElement.p>

	<Separator />
</header>
