type EffectFn = () => void;

let currentEffect: EffectFn | null = null;

export function signal<State>(initialState: State) {
  let currentState = initialState;
  const subscribers = new Set<EffectFn>();

  function get() {
    if (currentEffect) {
      subscribers.add(currentEffect);
    }

    return currentState;
  }

  function set(newState: State) {
    currentState = newState;

    for (const sub of subscribers) {
      sub();
    }
  }

  return [get, set] as const;
}

export function effect(fn: EffectFn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}
