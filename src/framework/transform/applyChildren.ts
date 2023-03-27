import { effect } from "../reactivity";
import { Child } from "./transform.types";

function applyChild(element: HTMLElement, child: Child) {
  if (child instanceof Function) {
    const span = document.createElement("span");
    effect(() => {
      span.textContent = child();
    });
    element.append(span);
    return;
  }

  if (child instanceof HTMLElement) {
    element.append(child);
    return;
  }

  element.append(document.createTextNode(child.toString()));
}

export function applyChildren(element: HTMLElement, children: Child[]) {
  for (const child of children) {
    applyChild(element, child);
  }
}
