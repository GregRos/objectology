import test from "ava";
import {className, classNameOwn} from "../lib";

test("numbers", t => {
    t.is(className(5), "Number");
    t.is(className(NaN), "Number");
    t.is(className(new Number(100)), "Number");
    t.is(classNameOwn(5), "Number");
});

test("booleans", t => {
    t.is(className(true), "Boolean");
    t.is(classNameOwn(true), "Boolean");
});

test("symbols", t => {
    t.is(className(Symbol("hi!")), "Symbol");
    t.is(className(Symbol.iterator), "Symbol");

});

test("strings", t => {
    t.is(className(""), "String");
    t.is(className("a"), "String");
});

test("null", t => {
    t.is(className(null), "Null");
});

test("undefined", t => {
    t.is(className(undefined), "Undefined");
});

test("function", t => {
    t.is(className(() => {}), "Function");
    t.is(className(function Blah() {}), "Function");
});

test("function - prototype null", t => {
    let f = function() {};
    Object.setPrototypeOf(f, null);
    t.is(className(f), "Function");
});

test("array", t => {
    t.is(className([]), "Array");
    t.is(className([1]), "Array");
});

test("plain object", t => {
    t.is(className({a: 1}), "Object");
    t.is(className({}), "Object");
});

test("Object.create - null", t => {
    t.is(className(Object.create(null)), "Object");
});

test("Object.create - unnamed", t => {
    t.is(className(Object.create({})), "Object");
});

test("object by named constructor", t => {
    function Blah() {}
    t.is(className(new function Blah() {}), "Blah");
});

test("object with named prototype, not using constructor", t => {
    function Blah() {}
    let x = Object.create(Blah.prototype);
    t.is(className(x), "Blah");
});

test("object with toStringTag", t => {
    t.is(className({[Symbol.toStringTag]: "hi"}), "hi");
});

test("object with toStringTag on proto - used", t => {
    t.is(className(Object.create({[Symbol.toStringTag] : "hi"})), "hi");
});

test("known object - Map", t => {
    t.is(className(new Map()), "Map");
});

test("known object - Set", t => {
    t.is(className(new Set()), "Set");
});

test("known object - WeakMap", t => {
    t.is(className(new WeakMap()), "WeakMap");
});

test("known object - Generator", t => {
    function* generator() {

    }

    t.is(className(generator()), "Generator");
});

test("toStringTag overrides constructorName", t => {
    let ctor = function constructorName() {

    };
    ctor.prototype[Symbol.toStringTag] = "toStringTag";

    t.is(className(new ctor()), "toStringTag");
});

test("extend known type with nameless ctor - Set", t => {
    let ctor = null || class extends Set {

    };

    let example = new ctor();

    t.is(className(example), "Set");
    t.is(classNameOwn(example), "");
});







