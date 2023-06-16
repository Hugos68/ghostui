import type { Expandable, Labelable } from '$lib/internal/types.js';
import type { Readable } from 'svelte/store';

export interface Dialog extends Readable<DialogState> {
	dialog(element: HTMLElement): SvelteActionReturnType;
    open: () => void;
	close: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DialogState extends Expandable {};

export type DialogParameters = Labelable;