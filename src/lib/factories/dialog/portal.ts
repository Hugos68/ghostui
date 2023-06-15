export function portal(element: HTMLElement, { target }: { target: HTMLElement}): SvelteActionReturnType {
    element.remove();
    target.append(element);
    return {};
}