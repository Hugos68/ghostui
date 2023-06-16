import type { Destroyable } from '$lib/internal/types.js';

export function portal(element: HTMLElement, { target }: { target: HTMLElement }): Destroyable {
	element.remove();
	target.append(element);
}
