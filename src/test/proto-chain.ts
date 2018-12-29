import test from "ava";
import {protoChain} from "../lib";


test("for primitives, gives [Primitive, Object]", t => {
    t.deepEqual(protoChain(5), [Number.prototype, Object.prototype]);
    t.deepEqual(protoChain(true), [Boolean.prototype, Object.prototype]);
    t.deepEqual(protoChain(""), [String.prototype, Object.prototype]);
    let symbolProtoChain = protoChain(Symbol.toStringTag);
    // Using t.deepEqual here fails due to how Symbol.prototype behaves.
    t.true(symbolProtoChain[0] === Symbol.prototype && symbolProtoChain[1] === Object.prototype);
});

test("for null and undefined, gives empty", t => {
    t.deepEqual(protoChain(null), []);
    t.deepEqual(protoChain(undefined), []);
});

test("for object, gives [target, Object]", t => {
    let obj = {};
    t.deepEqual(protoChain(obj), [obj, Object.prototype]);
});

test("for object with no prototype, gives [target]", t => {
    let obj = Object.create(null);
    t.deepEqual(protoChain(obj), [obj]);
});

test("for array, gives the same as object", t => {
    let arr = [];
    t.deepEqual(protoChain(arr), [arr, Array.prototype, Object.prototype]);
});

test("for function, gives [target, Function, Object]", t => {
    let f = () => {};
    t.deepEqual(protoChain(f), [f, Function.prototype, Object.prototype]);
});

test("for wrapped primitive, gives [target, Primitive, Object]", t =>{
    let n = new Number(1);
    let b = new Boolean(true);
    let str = new String("a");
    t.deepEqual(protoChain(n), [n, Number.prototype, Object.prototype]);
    t.deepEqual(protoChain(b), [b, Boolean.prototype, Object.prototype]);
    t.deepEqual(protoChain(str), [str, String.prototype, Object.prototype]);
});
