import type { Expandable } from '$lib/internal/types.js';
import type { Readable } from 'svelte/store';

export type AccordionPanelActionParameters = {
	label: string;
};

export type AccordionTriggerActionParameters = {
	panelLabel: string;
};

export interface Accordion extends Readable<(label: string ) => Expandable> {
	panel(
		element: HTMLElement,
		accordionpanelActionParameters: AccordionPanelActionParameters
	): SvelteActionReturnType;
	trigger(
		element: HTMLElement,
		accordionTriggerActionParameters: AccordionTriggerActionParameters
	): SvelteActionReturnType;
}

export type AccordionState = {
	expandedPanels: Set<string>;
};

export type AccordionParameters = {
	singlularExpanded?: boolean;
};
