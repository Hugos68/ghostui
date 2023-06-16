import { derived, writable, type Readable, type Writable } from "svelte/store";
import type { Tabs, TabsState } from "./types.js";
import { applyBehavior, onStoreChange, setAttribute } from "$lib/internal/behavior.js";
import type { Labelable } from "$lib/internal/types.js";
import { e } from "vitest/dist/index-5aad25c1.js";

export function createTabs(): Tabs {

    const store: Writable<TabsState> = writable({ tabs: new Set<string>(), current: '' });

    const { subscribe }: Readable<(label: string) => boolean> = derived(store, ($state) => {
        return (label: string) => $state.current === label;
    });


    function trigger(element: HTMLElement, { label: panelLabel }: Labelable) {
        const removeBehavior = applyBehavior(

        )
        return {
            destroy() {
                removeBehavior();
            }
        }
    }

    function panel(element: HTMLElement, { label }: Labelable) {
        store.update((state: TabsState) => {
            state.tabs.add(label);
            return state;
        });
        const removeBehavior = applyBehavior(
            setAttribute(element, 'aria-label', label),
            onStoreChange(store, (state: TabsState) => {
                if (state.current === label) element.setAttribute('aria-selected', 'true');
                else element.setAttribute('aria-selected', 'false');
            })
        )
        return {
            destroy() {
                removeBehavior();
            }
        }
    }

    return {
        trigger,
        panel,
        subscribe
    }
}