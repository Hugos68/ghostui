import { derived, writable, type Readable, type Writable } from 'svelte/store';
import type { Expandable, Labelable } from '../internal/types.js';
import { applyBehavior, onClick, onStoreChange, setAttribute } from '../internal/behavior.js';

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

export function createAccordion(accordionParamters?: AccordionParameters): Accordion {
	const store: Writable<AccordionState> = writable<AccordionState>({
		expandedPanels: new Set<string>()
	});

	const { subscribe }: Readable<(label: string) => Expandable> = derived(store, ($state) => {
		return (label: string) => {
			return {
				expanded: $state.expandedPanels.has(label)
			};
		};
	});

	const toggle = (label: string) => {
		store.update((state: AccordionState) => {
			if (!state.expandedPanels.has(label)) {
				if (accordionParamters?.singlularExpanded) state.expandedPanels.clear();
				state.expandedPanels.add(label);
			} else {
				state.expandedPanels.delete(label);
			}
			return state;
		});
	};

	function panel(element: HTMLElement, { label }: Labelable): SvelteActionReturnType {
		const removeBehavior = applyBehavior(setAttribute(element, 'aria-label', label));
		return {
			destroy() {
				removeBehavior();
			}
		};
	}

	function trigger(element: HTMLElement, { label: panelLabel }: Labelable): SvelteActionReturnType {
		const removeBehavior = applyBehavior(
			setAttribute(element, 'aria-controls', panelLabel),
			onStoreChange(store, (state: AccordionState) => {
				element.setAttribute('aria-expanded', String(state.expandedPanels.has(panelLabel)));
			}),
			onClick(element, () => toggle(panelLabel))
		);
		return {
			destroy() {
				removeBehavior();
			}
		};
	}

	return {
		panel,
		trigger,
		subscribe
	};
}