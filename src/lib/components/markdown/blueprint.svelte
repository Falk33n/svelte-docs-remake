<script
	lang="ts"
	module
>
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
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type BaseProps = {
		title: string;
		description: string;
		source: string;
		component: string;
		radix: string;
	};

	type Props = BaseProps & { children?: Snippet<[BaseProps]> };

	let { title, description, component, radix, source, children }: Props = $props();
</script>

{@render children?.({ title, description, component, radix, source })}
