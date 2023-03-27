export type Attributes = Record<string, any>;

export type Child = HTMLElement | string | Function;

declare global {
  namespace JSX {
    type IntrinsicElements = {
      [TKey in keyof HTMLElementTagNameMap]?: Attributes;
    };
  }
}

export type Factory = (
  args: {
    children: Child[];
  } & Attributes
) => HTMLElement;
