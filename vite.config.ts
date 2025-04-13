import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { veliteBuild } from './velite.plugin';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const veliteDirPath = join(__dirname, '.velite');

const config = defineConfig({
	plugins: [tailwindcss(), sveltekit(), veliteBuild()],
	server: {
		fs: {
			allow: [veliteDirPath],
		},
	},
});

export default config;
