import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/docs/svelte') {
		redirect(302, '/docs/svelte/introduction');
	} else if (event.url.pathname === '/docs/kit') {
		redirect(302, '/docs/kit/introduction');
	}

	return await resolve(event);
};
