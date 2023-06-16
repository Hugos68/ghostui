import type { Labelable } from '$lib/internal/types.js';
import type { Readable } from 'svelte/store';

export interface Tabs extends Readable<(label: string) => boolean> {
	trigger(element: HTMLElement, { label }: Labelable): SvelteActionReturnType;
	panel(element: HTMLElement, { label }: Labelable): SvelteActionReturnType;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TabsState {
    tabs: Set<string>;
    current: string;
}

export type TabParameters = Labelable;
