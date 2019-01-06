import test from "ava";
import {keysAll, keysAllStr} from "../lib";
import {createChain} from "./helpers/seq-identity";

test("gives [] for null/undefined", t => {
    t.deepEqual(keysAllStr(null), []);
    t.deepEqual(keysAllStr(undefined), []);
});

test("gives [] for empty object", t => {
    t.deepEqual(keysAllStr(Object.create(null)), []);
});

test("gives numeric keys in string form", t => {
    t.deepEqual(keysAllStr(createChain({0:1})), ["0"]);
});

test("skips symbols", t => {
    let symb = Symbol("a");
    let x = {
        [symb]: 1
    };
    t.deepEqual(keysAllStr(createChain(x)), []);
});
