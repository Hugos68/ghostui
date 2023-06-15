import type { Writable, Readable } from 'svelte/store';

export type AccordionPanelActionParameters = {
	label: string;
};

export type AccordionTriggerActionParameters = {
	panelLabel: string;
};

export interface Accordion extends Writable<AccordionState> {
	accordionPanel(
		element: HTMLElement,
		accordionpanelActionParameters: AccordionPanelActionParameters
	): SvelteActionReturnType;
	accordionTrigger(
		element: HTMLElement,
		accordionTriggerActionParameters: AccordionTriggerActionParameters
	): SvelteActionReturnType;
	isExpanded: Readable<(label: string) => boolean>
}

export type AccordionState = {
	expandedPanels: Set<string>;
};

export type AccordionParameters = {
	singlularExpanded?: boolean;
};
