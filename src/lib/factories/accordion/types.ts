import type { Expandable, Labelable } from '$lib/internal/types.js';
import type { Readable } from 'svelte/store';

export interface Accordion extends Readable<(label: string) => Expandable> {
	panel(element: HTMLElement, { label }: Labelable): SvelteActionReturnType;
	trigger(element: HTMLElement, { label }: Labelable): SvelteActionReturnType;
}

export type AccordionState = {
	expandedPanels: Set<string>;
};

export type AccordionParameters = {
	singlularExpanded?: boolean;
};
