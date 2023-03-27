import { effect } from "../reactivity";
import { applyChildren } from "./applyChildren";
import { Attributes, Child, Factory } from "./transform.types";

export function createElement(
  tag: string | Factory,
  attrs: Attributes,
  ...children: Child[]
): HTMLElement {
  if (typeof tag === "function") {
    return tag({ ...attrs, children });
  }

  const element = document.createElement(tag);

  if (attrs) {
    for (const name of Object.keys(attrs)) {
      const value = attrs[name];

      if (name.startsWith("on")) {
        const eventName = name.toLocaleLowerCase().substring(2);
        element.addEventListener(eventName, value);
        continue;
      }

      if (typeof value === "function") {
        effect(() => {
          (element as any)[name] = value();
        });
        continue;
      }

      element.setAttribute(name, value);
    }
  }

  applyChildren(element, children);

  return element;
}
