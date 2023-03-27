// nested effects are possible
// cleaning unnecessary subscriptions

type Dependency = Set<Subscriber>;
type Subscriber = {
  execute(): void;
  dependencies: Set<Dependency>;
};

const context: Subscriber[] = [];

export function signal<State>(initialState: State) {
  let currentState = initialState;
  const subscribers = new Set<Subscriber>();

  function get() {
    const currentRunning = context.at(-1);
    if (currentRunning) {
      subscribers.add(currentRunning);
      currentRunning.dependencies.add(subscribers);
    }

    return currentState;
  }

  function set(newState: State) {
    currentState = newState;

    for (const sub of [...subscribers]) {
      sub.execute();
    }
  }

  return [get, set] as const;
}

function cleanup(running: Subscriber) {
  for (const dep of running.dependencies) {
    dep.delete(running);
  }

  running.dependencies.clear();
}

export function effect(fn: () => void | Promise<void>) {
  function execute() {
    cleanup(running);
    context.push(running);

    Promise.resolve(fn()).finally(() => {
      context.pop();
    });
  }

  const running: Subscriber = {
    execute,
    dependencies: new Set(),
  };

  execute();
}

export function memo<State>(fn: () => State) {
  const [memoized, setMemoized] = signal(null as State);

  effect(() => {
    setMemoized(fn());
  });

  return memoized;
}
