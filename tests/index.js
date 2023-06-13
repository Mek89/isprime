import assert from "assert";
import { isPrimenumber } from "../build/debug.js";
assert.strictEqual(isPrimenumber(7), 1);
assert.strictEqual(isPrimenumber(8), 0);
console.log("ok");
