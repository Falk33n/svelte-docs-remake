<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../styles/app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<ModeWatcher />
{@render children()}
