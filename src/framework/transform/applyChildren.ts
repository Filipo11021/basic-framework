import { effect } from "../reactivity";
import { Child } from "./transform.types";

function applyChild(element: HTMLElement, child: Child) {
  if (typeof child === "function") {
    const text = document.createTextNode(child());

    effect(() => {
      text.textContent = String(child());
    });

    element.append(text);
    return;
  }

  if (child instanceof HTMLElement) {
    element.append(child);
    return;
  }

  element.append(String(child));
}

export function applyChildren(element: HTMLElement, children: Child[]) {
  for (const child of children) {
    applyChild(element, child);
  }
}
