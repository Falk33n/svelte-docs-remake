import { type Doc, docs } from '$velite';
import { error } from '@sveltejs/kit';
import { type ClassValue, clsx } from 'clsx';
import type { Component } from 'svelte';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function slugFromPath(path: string) {
	return path.replace('/src/content/', '').replace('.md', '');
}

export type DocFile = {
	default: Component;
	metadata: Doc;
};

export type DocResolver = () => Promise<DocFile>;

type Modules = Record<string, () => Promise<unknown>>;

function findMatch(slug: string, modules: Modules) {
	let match: { path?: string; resolver?: DocResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === slug) {
			match = { path, resolver: resolver as unknown as DocResolver };
			break;
		}
	}

	return match;
}

export async function getDoc(slug: string) {
	const modules = import.meta.glob(`/src/content/**/*.md`);
	const match = findMatch(slug, modules);
	const doc = await match?.resolver?.();

	const metadata = docs.find((doc) => doc.path === slug);
	if (!doc || !metadata) {
		error(404);
	}

	return {
		component: doc.default,
		metadata,
		title: metadata.title,
	};
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeDocsTitleLink(str: string) {
	const splitWords = str.split(/[\s-]+/);

	const capitalizedWords = splitWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

	return {
		text: capitalizedWords.join(' '),
		link: capitalizedWords.join('-'),
	};
}
