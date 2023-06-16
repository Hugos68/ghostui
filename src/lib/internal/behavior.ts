import type { Writable } from 'svelte/store';
import type { Destroyable, Expandable } from './types.js';

export function applyBehavior(...destroyables: Destroyable[]): () => void {
	function removeBehavior() {
		destroyables.forEach((destroyable: Destroyable) => {
			if (destroyable) destroyable.destroy();
		});
	}
	return removeBehavior;
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

export function onUpdate<T>(store: Writable<T>, callback: (state: T) => void): Destroyable {
	const unsubscribe = store.subscribe(state => callback(state));
	return {
		destroy() {
			unsubscribe();
		}
	}
}

export function onClick(element: HTMLElement, callback: () => void): Destroyable {
	element.addEventListener('click', callback);
	return {
		destroy() {
			element.removeEventListener('click', callback);
		}
	}
}