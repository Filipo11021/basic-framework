// nested effects are possible

type Subscriber = () => void | Promise<void>;

const context: Subscriber[] = [];

export function signal<State>(initialState: State) {
  let currentState = initialState;
  const subscribers = new Set<Subscriber>();

  function get() {
    const currentEffectFunction = context.at(-1);
    if (currentEffectFunction) {
      subscribers.add(currentEffectFunction);
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

export function effect(fn: Subscriber) {
  function execute() {
    context.push(execute);

    Promise.resolve(fn()).finally(() => {
      context.pop();
    });
  }

  execute();
}

export function memo<State>(fn: () => State) {
  const [memoized, setMemoized] = signal(null as State);

  effect(() => {
    setMemoized(fn());
  });

  return memoized;
}
