import { desc, run, sh, task } from "https://deno.land/x/drake/mod.ts";

console.log('Hello', Deno.env.get('USERNAME'))

desc("Minimal Drake task");
task("hello", [], async function () {
  console.log("Hello from Drake!");
  await sh("deno run --allow-env main.ts");
});

run();