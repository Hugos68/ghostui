export type Destroyable = void | { destroy(): void };

export type Expandable = {
    expanded: boolean;
}
export type Labelable = {
    label: string;
}