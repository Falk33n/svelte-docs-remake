import { exec } from 'child_process';
import type { Plugin } from 'vite';

export function veliteBuild(): Plugin {
	return {
		name: 'vite:velite-build',
		handleHotUpdate({ file }) {
            if (file.endsWith(".md")) {
			exec('npm run velite:build', (err, stdout, stderr) => {
				if (err) {
					console.error('[velite] build error:', stderr);
				} else {
					console.log('[velite] build complete:\n', stdout);
				}
			});
            }
		},
	};
}