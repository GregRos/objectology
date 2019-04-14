import test from "ava";
import {keysAll} from "../lib";

test("empty object", t => {
    t.deepEqual(keysAll(Object.create(null)), []);
});

test("one property object", t => {
    let oneProp = Object.create(null, {
        a: {
            value: 5
        }
    });
    t.deepEqual(keysAll(oneProp), ["a"]);
});

test("inherited properties", t => {
    let a = Object.create(null, {
        a: {
            value: 5
        }
    });
    let b = Object.create(a, {
        b: {
            value: 10
        }
    });

    t.deepEqual(keysAll(b), ["b", "a"]);
});

test("symbol key", t => {
    let symb = Symbol("test");
    let a = Object.create(null, {
        [symb]: {
            value: 5
        }
    });
    t.deepEqual(keysAll(a), [symb]);
});

test("numeric key", t => {
    let a = Object.create(null, {
        5: {
            value: 5
        }
    });

    t.deepEqual(keysAll(a), ["5"]);
});

test("null/undefined give []", t => {
    t.deepEqual(keysAll(null), []);
    t.deepEqual(keysAll(undefined), []);
});

