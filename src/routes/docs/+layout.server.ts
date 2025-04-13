import { convertToHref, getAllDocs } from '$lib/utils';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const docs = await getAllDocs();
	const isSvelteKit = event.url.pathname.startsWith('/docs/kit/');

	const filteredDocs = docs.filter((doc) => {
		const slugContainsKit = doc.metadata.slugFull.startsWith('/kit/');
		return (isSvelteKit && slugContainsKit) || (!isSvelteKit && !slugContainsKit);
	});

	filteredDocs.sort((a, b) => a.metadata.order - b.metadata.order);

	const sidebarLinks = filteredDocs.reduce(
		(acc, doc) => {
			const { category, title } = doc.metadata;

			if (!acc[category]) {
				acc[category] = [];
			}

			acc[category].push({
				title,
				href: convertToHref(title),
			});

			return acc;
		},
		{} as Record<string, { title: string; href: string }[]>,
	);

	return {
		sidebarLinks,
		isSvelteKit,
	};
};
