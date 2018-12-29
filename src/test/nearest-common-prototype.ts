import test from "ava";
import {nearestCommonPrototype} from "../lib";

test("two different regular objects give Object.", t => {
    t.is(nearestCommonPrototype({}, {}), Object.prototype);
});

test("two primitives give Primitive", t => {
    t.is(nearestCommonPrototype(5, 1), Number.prototype);
    t.is(nearestCommonPrototype(true, false), Boolean.prototype);
});

test("identical primitives give Primitive", t => {
    t.is(nearestCommonPrototype(true, true), Boolean.prototype);
    t.is(nearestCommonPrototype(1, 1), Number.prototype);
});

test("identical objects give target", t => {
    let a = {};
    t.is(nearestCommonPrototype(a, a), a);
});

test("object alone returns that object", t => {
    let a = {};
    t.is(nearestCommonPrototype(a), a);
});

test("primitive alone returns Primitive", t => {
    t.is(nearestCommonPrototype(5), Number.prototype);
    t.is(nearestCommonPrototype("a"), String.prototype);
});

test("empty arguments gives null", t => {
    let a = {};
    t.is(nearestCommonPrototype(), null);
});

test("nulls and undefineds always give null", t => {
    t.is(nearestCommonPrototype(null, null), null);
    t.is(nearestCommonPrototype(undefined, null), null);
    t.is(nearestCommonPrototype(null), null);
    t.is(nearestCommonPrototype(undefined), null);
    t.is(nearestCommonPrototype(null, undefined, ""), null);
    t.is(nearestCommonPrototype(null, new Number(1), new Number(4)), null);
});


test("A ⊆ B, B ⇒ B", t => {
    let a = {};
    let b = Object.create(a);
    t.is(nearestCommonPrototype(a, b), a);
});

test("A ⊆ B, C ⊆ B gives B", t => {
    let b = {};
    let a = Object.create(b),
        c = Object.create(b);

    t.is(nearestCommonPrototype(a, c), b);
    t.is(nearestCommonPrototype(a, b, c), b);
});

test("two null-prototype objects give null", t => {
    t.is(nearestCommonPrototype(Object.create(null), Object.create(null)),
        null
    );
});

test("two of the same object and something else give Object", t => {
    let a = {};
    t.is(nearestCommonPrototype(a, a, {}), Object.prototype);
});
