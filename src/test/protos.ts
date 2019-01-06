import test from "ava";
import {seqEqual} from "./helpers/seq-identity";
import {protos} from "../lib";


test("skips self in prototype chain", t => {
    let x = {};
    let y = Object.create(x);

    t.true(seqEqual(protos(y), [x, Object.prototype]));
    t.true(seqEqual(protos(x), [Object.prototype]))
});

test("for primitive, also skips self (and not prototype)", t => {
    t.true(seqEqual(protos(4), [Number.prototype, Object.prototype]));
});