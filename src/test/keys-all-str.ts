import test from "ava";
import {keysAllStr} from "../lib";

test("gives [] for null/undefined", t => {
    t.deepEqual(keysAllStr(null), []);
    t.deepEqual(keysAllStr(undefined), []);
});

test("gives [] for empty object", t => {
    t.deepEqual(keysAllStr(Object.create(null)), []);
});