import { MediaQuery } from 'svelte/reactivity';

const MOBILE_BREAKPOINT = 768;
const LAPTOP_BREAKPOINT = 1280;

export class IsMobile extends MediaQuery {
	constructor() {
		super(`max-width: ${MOBILE_BREAKPOINT}px`);
	}
}

export class IsLaptop extends MediaQuery {
	constructor() {
		super(`min-width: ${LAPTOP_BREAKPOINT}px`);
	}
}
