import { derived, writable, type Readable, type Writable } from 'svelte/store';
import type {
	Accordion,
	AccordionPanelActionParameters,
	AccordionParameters,
	AccordionState,
	AccordionTriggerActionParameters
} from './types.js';
import type { Expandable } from '$lib/internal/types.js';
import { applyBehavior, onClick, onUpdate, setAttribute } from '$lib/internal/behavior.js';

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

	function panel(element: HTMLElement, { label }: AccordionPanelActionParameters): SvelteActionReturnType {
		const removeBehavior = applyBehavior(
			setAttribute(element, 'aria-label', label)
		)
		return {
			destroy() {
				removeBehavior();
			}
		};
	}

	function trigger(element: HTMLElement,{ panelLabel }: AccordionTriggerActionParameters): SvelteActionReturnType {
		const removeBehavior = applyBehavior(
			setAttribute(element, 'aria-controls', panelLabel),
			onUpdate(store, (state: AccordionState) => {
				element.setAttribute('aria-expanded', String(state.expandedPanels.has(panelLabel)));
			}),
			onClick(element, () => toggle(panelLabel))
		)
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
