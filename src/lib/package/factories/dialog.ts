import { writable, type Readable, type Writable, derived } from 'svelte/store';
import {
	applyBehavior,
	setAttribute,
	onClickOutside,
	onStoreChange,
	portal,
	onKeydown
} from '../internal/behavior.js';
import type { Expandable, Labelable } from '../internal/types.js';

export interface Dialog extends Readable<Partial<DialogState>> {
	dialog(element: HTMLElement): SvelteActionReturnType;
	open: () => void;
	close: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DialogState extends Expandable {}

export type DialogParameters = Labelable;

export function createDialog({ label }: DialogParameters): Dialog {
	const state = { expanded: false };
	let cachedState = structuredClone(state);
	const store: Writable<DialogState> = writable<DialogState>(state);

	const { subscribe } = derived(store, ($state) => {
		const { expanded } = $state;
		return { expanded };
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
			onKeydown(document, (event: KeyboardEvent) => {
				if (event.key !== 'Escape') return;
				event.preventDefault();
				close();
			}),
			onStoreChange(store, (state: DialogState) => {
				if (state.expanded) document.body.children[0].setAttribute('inert', '');
				else document.body.children[0].removeAttribute('inert');
				const closed = cachedState.expanded && !state.expanded;
				const opened = !cachedState.expanded && state.expanded;
				if (closed) element.dispatchEvent(new Event('close'));
				if (opened) element.dispatchEvent(new Event('open'));
				cachedState = structuredClone(state);
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
		subscribe
	};
}
