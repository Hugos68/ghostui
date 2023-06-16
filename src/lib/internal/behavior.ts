import type { Writable } from 'svelte/store';
import type { Destroyable } from './types.js';

export function applyBehavior(...destroyables: Destroyable[]): () => void {
	function removeBehavior() {
		destroyables.forEach((destroyable: Destroyable) => {
			if (destroyable) destroyable.destroy();
		});
	}
	return removeBehavior;
}

export function portal(element: HTMLElement, { target }: { target: HTMLElement }): Destroyable {
	element.remove();
	target.append(element);
}

export function setAttribute(element: HTMLElement, attribute: string, value: string): Destroyable {
	element.setAttribute(attribute, value);
}

// export function addListener(
// 	element: EventTarget,
// 	type: keyof HTMLElementEventMap,
// 	callback,
// 	options
// ): Destroyable {
// 	element.addEventListener(type, callback, options);
// 	return {
// 		destroy() {
// 			element.removeEventListener(type, callback, options);
// 		}
// 	};
// }

export function onClickOutside(element: HTMLElement, callback: () => void) {
	const clickHandler = (event: MouseEvent) => {
		if (!element.contains(event.target as HTMLElement)) callback();
	};
	document.addEventListener('click', clickHandler, true);
	return {
		destroy() {
			document.removeEventListener('click', clickHandler, true);
		}
	};
}

export function onStoreChange<T>(store: Writable<T>, callback: (state: T) => void): Destroyable {
	const unsubscribe = store.subscribe((state) => callback(state));
	return {
		destroy() {
			unsubscribe();
		}
	};
}

export function onClick(
	element: HTMLElement | Document,
	callback: (event: MouseEvent) => void
): Destroyable {
	if (element instanceof HTMLElement) element.addEventListener('click', callback);
	else if (element instanceof Document) document.addEventListener('click', callback);
	return {
		destroy() {
			if (element instanceof HTMLElement) element.removeEventListener('click', callback);
			else if (element instanceof Document) document.removeEventListener('click', callback);
		}
	};
}

export function onKeydown(
	element: HTMLElement | Document,
	callback: (event: KeyboardEvent) => void
): Destroyable {
	if (element instanceof HTMLElement) element.addEventListener('keydown', callback);
	else if (element instanceof Document) document.addEventListener('keydown', callback);
	return {
		destroy() {
			if (element instanceof HTMLElement) element.removeEventListener('keydown', callback);
			else if (element instanceof Document) document.removeEventListener('keydown', callback);
		}
	};
}
