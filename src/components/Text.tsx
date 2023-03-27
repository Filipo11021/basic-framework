import { createElement } from "../framework/transform";

import { signal } from "../framework/reactivity";

export function Text() {
  const [text, setText] = signal("world");

  return (
    <div>
      <p>hello {text}</p>
      <input
        type="text"
        oninput={(e: Event) => {
          const el = e.currentTarget as HTMLInputElement;
          setText(el.value);
        }}
        value={text}
      />
      <button onclick={() => setText("world")}>reset</button>
    </div>
  );
}
