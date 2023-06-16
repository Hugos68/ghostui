export type Destroyable = { destroy: () => void };
export type Behaviour = (() => Destroyable);
