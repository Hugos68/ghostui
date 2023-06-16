import { writable, type Writable } from 'svelte/store';
import type { Dialog, DialogParameters, DialogState } from './types.js';
import { portal } from './portal.js';
import {
	applyBehavior,
	setAttribute,
    onClickOutside,
	onUpdate
} from '$lib/internal/behavior.js';

export function createDialog({ label }: DialogParameters): Dialog {
	const store: Writable<DialogState> = writable<DialogState>({
		expanded: false
	});

	function open() {
		store.update((state: DialogState) => {
			state.expanded = true;
			return state;
		});
	}

	function close() {
		store.update((state: DialogState) => {
			state.expanded = false;
			return state;
		});
	}

	function dialog(element: HTMLElement) {
		
		const removeBehavior = applyBehavior(
			setAttribute(element, 'aria-label', label),
			setAttribute(element, 'aria-modal', 'true'),
			setAttribute(element, 'role', 'dialog'),
			portal(element, { target: document.body }),
			onClickOutside(element, close),
			onUpdate(store, (state: DialogState) => {
				if (state.expanded) document.body.children[0].setAttribute('inert', '')
				else document.body.children[0].removeAttribute('inert')
			})
		);

		return {
			destroy() {
				removeBehavior();
			}
		};
	}

	return {
		open,
		close,
		dialog,
		subscribe: store.subscribe,
	};
}
