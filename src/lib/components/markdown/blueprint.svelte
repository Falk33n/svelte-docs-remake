<script
	lang="ts"
	module
>
	import type { Snippet } from 'svelte';

	export {
		a,
		blockquote,
		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		hr,
		img,
		li,
		ol,
		p,
		pre,
		table,
		td,
		th,
		tr,
		ul,
	} from './index';

	type BlueprintBase = {
		title: string;
		description: string;
		source: string;
		component: string;
		radix: string;
	};

	type BlueprintProps = BlueprintBase & { children?: Snippet<[BlueprintBase]> };
</script>

<script lang="ts">
	let { title, description, component, radix, source, children }: BlueprintProps = $props();
</script>

{@render children?.({ title, description, component, radix, source })}
