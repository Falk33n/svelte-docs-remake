// @ts-check
import { defineCollection, defineConfig, s } from 'velite';

const docSchema = s
	.object({
		title: s.string(),
		description: s.string(),
		category: s.string(),
		order: s.number(),
		path: s.path(),
		prevPath: s
			.record(s.string(), s.string())
			.refine((value) => Object.keys(value).length === 1)
			.optional(),
		nextPath: s
			.record(s.string(), s.string())
			.refine((value) => Object.keys(value).length === 1)
			.optional(),
		linksOnThisPage: s.record(s.string(), s.string()).optional(),
	})
	.transform((data) => {
		return {
			...data,
			slug: data.path.split('/').slice(1).join('/'),
			slugFull: `/${data.path}`,
		};
	});

const docs = defineCollection({
	name: 'Doc',
	pattern: './**/*.md',
	schema: docSchema,
});

export default defineConfig({
	root: './src/content',
	collections: {
		docs,
	},
});
