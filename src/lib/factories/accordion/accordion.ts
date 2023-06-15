import { derived, writable, type Readable, type Writable } from 'svelte/store';
import type {
	Accordion,
	AccordionPanelActionParameters,
	AccordionParameters,
	AccordionState,
	AccordionTriggerActionParameters
} from './types.js';

export function createAccordion(accordionParamters?: AccordionParameters): Accordion {
	const { subscribe, update, set }: Writable<AccordionState> = writable<AccordionState>({ expandedPanels: new Set<string>() });

	function togglePanel(label: string) {
		update((state: AccordionState) => {
			if (state.expandedPanels.has(label)) {
				state.expandedPanels.delete(label);
			} else {
				if (accordionParamters?.singlularExpanded) state.expandedPanels.clear();
				state.expandedPanels.add(label);
			}
			return state;
		});
	}

	function accordionPanel(
		element: HTMLElement,
		{ label }: AccordionPanelActionParameters
	): SvelteActionReturnType {
		element.setAttribute('aria-labelledby', label);
	}

	function accordionTrigger(
		element: HTMLElement,
		{ panelLabel }: AccordionTriggerActionParameters
	): SvelteActionReturnType {
		element.setAttribute('aria-controls', panelLabel);
		element.id = panelLabel;
		
		const unsubscribe = subscribe((state: AccordionState) => {
			element.setAttribute('aria-expanded', String(state.expandedPanels.has(panelLabel)));
		});

		function clickHandler() {
			togglePanel(panelLabel);
		}
		element.addEventListener('click', clickHandler);

		function keydownHandler(event: KeyboardEvent) {
			if (event.key !== 'Up' && event.key !== 'Down') return;
			event.preventDefault();
		}
		element.addEventListener('keydown', keydownHandler);

		return {
			destroy() {
				unsubscribe();
				element.removeEventListener('click', clickHandler);
			}
		};
	}

    const isExpanded: Readable<(label: string) => boolean> = derived({ subscribe }, (state: AccordionState) => (label: string) => state.expandedPanels.has(label))

	return {
		accordionPanel,
		accordionTrigger,
		isExpanded,
		subscribe,
		update,
		set
	};
}
