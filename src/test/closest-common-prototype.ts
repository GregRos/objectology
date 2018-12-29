import test from "ava";
import {closestCommonPrototype} from "../lib";

test("two different regular objects give Object.", t => {
    t.is(closestCommonPrototype({}, {}), Object.prototype);
});

test("two primitives give Primitive", t => {
    t.is(closestCommonPrototype(5, 1), Number.prototype);
    t.is(closestCommonPrototype(true, false), Boolean.prototype);
});

test("identical primitives give Primitive", t => {
    t.is(closestCommonPrototype(true, true), Boolean.prototype);
    t.is(closestCommonPrototype(1, 1), Number.prototype);
});

test("identical objects give target", t =>{
    let a = {};
    t.is(closestCommonPrototype(a, a), a);
});

test("object alone returns that object", t => {
    let a = {};
    t.is(closestCommonPrototype(a), a);
});

test("primitive alone returns Primitive", t => {
    t.is(closestCommonPrototype(5), Number.prototype);
    t.is(closestCommonPrototype("a"), String.prototype);
});

test("empty arguments gives null", t => {
    let a = {};
    t.is(closestCommonPrototype(), null);
});

test("nulls and undefineds always give null", t => {
    t.is(closestCommonPrototype(null, null), null);
    t.is(closestCommonPrototype(undefined, null), null);
    t.is(closestCommonPrototype(null), null);
    t.is(closestCommonPrototype(undefined), null);
    t.is(closestCommonPrototype(null, undefined, ""), null);
    t.is(closestCommonPrototype(null, new Number(1), new Number(4)), null);
});



test("A ⊆ B, B ⇒ B", t => {
    let a = {};
    let b = Object.create(a);
    t.is(closestCommonPrototype(a, b), a);
});

test("A ⊆ B, C ⊆ B gives B", t => {
    let b = {};
    let a = Object.create(b),
        c = Object.create(b);

    t.is(closestCommonPrototype(a, c), b);
    t.is(closestCommonPrototype(a, b, c), b);
});

test("two null-prototype objects give null", t => {
    t.is(closestCommonPrototype(Object.create(null), Object.create(null)), null);
});

test("two of the same object and something else give Object", t => {
    let a = {};
    t.is(closestCommonPrototype(a, a, {}), Object.prototype);
})
