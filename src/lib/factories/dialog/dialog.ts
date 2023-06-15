import { writable, type Readable, type Writable, derived } from "svelte/store";
import type { Dialog, DialogState } from "./types.js";
import { portal } from "./portal.js";

export function createDialog(): Dialog { 

    const { subscribe, update, set }: Writable<DialogState> = writable<DialogState>({ expanded: false });

    
    function openDialog() {
        update((state: DialogState) => {
            state.expanded = true;
            return state;
        });
    }

    function closeDialog() {
        update((state: DialogState) => {
            state.expanded = false;
            return state;
        });
    }

    function dialogWindow(element: HTMLElement) {
        element.setAttribute('role', 'dialog');
    
        portal(element, { target: document.body });

        const unsubscribe = subscribe((state: DialogState) => {
            if (state.expanded) document.body.children[0].setAttribute('inert', '');
            else document.body.children[0].removeAttribute('inert');
        });

        function mousedownHandler(event: MouseEvent) {
            if (!element.contains(event.target as HTMLElement)) closeDialog();
        }
        document.addEventListener('mousedown', mousedownHandler);
  
        return {
            destroy() {
                closeDialog();
                unsubscribe();
                document.removeEventListener('mousedown', mousedownHandler);
            }
        }
    }

    const isExpanded: Readable<() => boolean> = derived({ subscribe }, (state: DialogState) => () => state.expanded);

    return {
        openDialog,
        closeDialog,
		isExpanded,
        dialogWindow,
		subscribe,
		update,
		set
    }
}