import { createElement } from "../framework/transform";

import { signal } from "../framework/reactivity";

export function Counter() {
  const [count, setCount] = signal(0);
  const doubleCount = () => count() * 2;

  return (
    <div>
      <p>count: {count}</p>
      <p>double count: {doubleCount}</p>
      <button onclick={() => setCount(0)}>reset</button>
      <button onclick={() => setCount(count() + 1)}>increment</button>
    </div>
  );
}
