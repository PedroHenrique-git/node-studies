import sayHello, { sayHelloV2 } from "./ecma-module.mjs";

const shv = sayHello('Pedro');
const shv2 = sayHelloV2('Pedro v2');

console.log(`${shv}\n${shv2}`);