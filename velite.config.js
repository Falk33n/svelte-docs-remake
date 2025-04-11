// @ts-check
import { defineCollection, defineConfig, s } from 'velite';

const docSchema = s
	.object({
		title: s.string(),
		description: s.string(),
		path: s.path(),
		links: s.record(s.string(), s.string()).optional(),
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
