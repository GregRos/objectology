import test from "ava";
import {keysOwn} from "../lib";

test("gives [] for null, undefined", t => {
    t.deepEqual(keysOwn(null), []);
    t.deepEqual(keysOwn(undefined), []);
});

test("gives [] for empty object", t => {
    t.deepEqual(keysOwn(Object.create(null)), []);
});