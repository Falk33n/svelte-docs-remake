<script lang="ts">
	import { convertToHref } from '$lib/utils';
	import * as HTMLElement from '../markdown';
	import DocsOnThisPageLink from './docs-on-this-page-link.svelte';

	type Props = { linksOnThisPage?: Record<string, string>; title: string };

	let { title, linksOnThisPage }: Props = $props();

	let activeLink = $state({ current: '' });

	const titleAsHref = $derived(convertToHref(title));

	let userClicked = false;

	function handleActiveLinkChange(href: string) {
		userClicked = true;
		activeLink.current = href;

		setTimeout(() => {
			userClicked = false;
		}, 1000);
	}

	function getClosestHeading(headings: HTMLElement[]): string | null {
		let closestId: string | null = null;
		let closestDistance = Infinity;

		for (const heading of headings) {
			const rect = heading.getBoundingClientRect();
			const distance = Math.abs(rect.top);
			if (distance < closestDistance) {
				closestDistance = distance;
				closestId = heading.id;
			}
		}

		return closestId;
	}

	function handleIntersection(entries: IntersectionObserverEntry[]) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				const newActiveLink = entry.target.id;
				if (activeLink.current !== newActiveLink && !userClicked) {
					activeLink.current = newActiveLink;
				}
				break;
			}
		}
	}

	$effect(() => {
		const titleHeading = document.getElementById(titleAsHref);
		if (!titleHeading) return;

		const headings: HTMLElement[] = [titleHeading];

		if (linksOnThisPage) {
			Object.entries(linksOnThisPage).forEach(([key, _]) => {
				const heading = document.getElementById(key);
				if (heading) headings.push(heading);
			});
		}

		const observer = new IntersectionObserver(handleIntersection, {
			rootMargin: '0px 0px -65% 0px',
		});

		headings.forEach((heading) => observer.observe(heading));

		if (activeLink.current === '') {
			const closestHeadingId = getClosestHeading(headings);
			if (closestHeadingId) {
				activeLink.current = closestHeadingId;
			}
		}

		return () => observer.disconnect();
	});
</script>

<aside class="order-2 hidden xl:block">
	<nav class="sticky space-y-2 lg:top-24">
		<HTMLElement.h4
			class="mt-0 text-xl"
			id="on-this-page"
		>
			On this page
		</HTMLElement.h4>

		<HTMLElement.ol class="m-0 list-inside space-y-3">
			<DocsOnThisPageLink
				bind:activeLink
				href={titleAsHref}
				text={title}
				{handleActiveLinkChange}
			/>

			{#if linksOnThisPage}
				{#each Object.entries(linksOnThisPage) as [key, value]}
					<DocsOnThisPageLink
						bind:activeLink
						href={key}
						text={value}
						{handleActiveLinkChange}
					/>
				{/each}
			{/if}
		</HTMLElement.ol>
	</nav>
</aside>
