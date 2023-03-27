import "./style.css";
import { App } from "./components/App";

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw Error("root does not exist");
}

root.append(App());
