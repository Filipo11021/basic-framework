import { createElement } from "../framework/transform";

import { Counter } from "./Counter";
import { Text } from "./Text";

export function App() {
  return (
    <div>
      <Text />
      <Counter />
    </div>
  );
}
