import test from "ava";
import {ctor} from "../lib";

test("object ctor", t => {
    t.is(ctor({}), Object);
});

test("no ctor", t => {
    t.is(ctor(Object.create(null)), null);
});

test("primitive ctor", t => {
    t.is(ctor(5), Number);
    t.is(ctor(true), Boolean);
    t.is(ctor("a"), String);
    t.is(ctor(Symbol("")), Symbol);
});

test("null/undefined", t => {
    t.is(ctor(null), null);
    t.is(ctor(undefined), null);
});

test("custom ctor", t => {
    function Blah() {}

    t.is(ctor(new Blah()), Blah);
});

test("ctor of no-ctor inheritance", t => {
    function Blah() {}

    let derived = Object.create(new Blah());

    t.is(ctor(derived), null);
});