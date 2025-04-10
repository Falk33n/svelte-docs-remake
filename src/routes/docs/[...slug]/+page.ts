import { getDoc } from '$lib/utils';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { component, title, metadata } = await getDoc(event.params.slug);

	return {
		component,
		metadata,
		title,
	};
};

export const entries: EntryGenerator = () => {
	const modules = import.meta.glob('/src/content/**/*.md');
	const entries = [];

	for (const path of Object.keys(modules)) {
		const slug = path.replace('/src/content/', '').replace('.md', '').replace('/index', '');
		entries.push({ slug });
	}

	return entries;
};
