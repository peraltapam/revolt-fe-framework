import { withoutNulls } from "./utils/arrays.js";

export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};
// vNodes: array of virtual nodes
export function hFragment(vNodes) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  };
}

export function hString(str) {
  return {
    type: DOM_TYPES.TEXT,
    value: str,
  };
}

function mapTextNodes(children) {
  return children.map((child) => {
    typeof child === "string" ? hString(child) : child;
  });
}

// tag : string, props: object, children: array of nodes
// h is short for hyperscript
export function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    // child nodes could be strings instead of tags, so we need to convert them to DOM_TYPES.TEXT
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  };
}

// execise 3.2
// h("h1", { class: "title" }, ["My Counter"]);
// h("div", { class: "container" }, [
//   h("button", {}, ["decrement"]),
//   h("span", {}, ["0"]),
//   h("button", {}, ["increment"]),
// ]);

// // exercise 3.3
// function limpsum(num) {
//   const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
//     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//     enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
//     ut aliquip ex ea commodo consequat.`;

//   return hFragment(Array(num).fill(h("p", {}, [text])));
// }
