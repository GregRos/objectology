import test from "ava";
import {ctors} from "../lib";
import {seqEqual} from "./helpers/seq-identity";

test("object", t => {
    t.true(seqEqual(ctors({}), [Object]));
});

test("array", t => {
    t.true(seqEqual(ctors([]), [Array, Object]));
});

test("primitives", t => {
    t.true(seqEqual(ctors(5), [Number, Object]));
    t.true(seqEqual(ctors(true), [Boolean, Object]));
    t.true(seqEqual(ctors(""), [String, Object]));
    t.true(seqEqual(ctors(Symbol("")), [Symbol, Object]));
});

test("null/undefined", t => {
    t.true(seqEqual(ctors(null), []));
    t.true(seqEqual(ctors(undefined), []));
});

test("custom", t => {
    function Blah(){}

    t.true(seqEqual(ctors(new Blah()), [Blah, Object]));
});

test("null-prototype", t => {
    t.true(seqEqual(ctors(Object.create(null)), []));
});

test("missing-ctor inheritance", t => {
    let x = Object.create({a: 1});
    t.true(seqEqual(ctors(x), [null, Object]));
});


