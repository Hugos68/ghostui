import type { Readable, Writable } from 'svelte/store';

export interface Dialog extends Writable<DialogState> {
	dialogWindow(element: HTMLElement): SvelteActionReturnType;
    openDialog: () => void;
	closeDialog: () => void;
	isExpanded: Readable<() => boolean>;
}

export type DialogState = {
	expanded: boolean;
};

export type DialogParameters = {
	label: string
};
