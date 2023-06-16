import type { Behaviour, Destroyable } from "./types.js";

export function applyBehaviour(...behaviours: Behaviour[]) {
    const destroyables: Destroyable[] = [];
    behaviours.forEach((behaviour: Behaviour) => {
        destroyables.push(behaviour());
    });
    return {
        destroy() {
            destroyables.forEach((destroyable: Destroyable) => {
                destroyable.destroy();
            });
        }
    }
}