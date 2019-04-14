import test from "ava";
import {protoChain} from "../lib";
import {seqEqual} from "./helpers/seq-identity";


test("for primitives, gives [Primitive, Object]", t => {
    t.true(seqEqual(protoChain(5), [Number.prototype, Object.prototype]));
    t.true(seqEqual(protoChain(true), [Boolean.prototype, Object.prototype]));
    t.true(seqEqual(protoChain(""), [String.prototype, Object.prototype]));
    let symbolProtoChain = protoChain(Symbol.toStringTag);
    // Using t.deepEqual here fails due to how Symbol.prototype behaves.
    t.true(symbolProtoChain[0] === Symbol.prototype && symbolProtoChain[1] ===
        Object.prototype);
});

test("for null and undefined, gives empty", t => {
    t.true(seqEqual(protoChain(null), []));
    t.true(seqEqual(protoChain(undefined), []));
});

test("for object, gives [target, Object]", t => {
    let obj = {};
    t.true(seqEqual(protoChain(obj), [obj, Object.prototype]));
});

test("for object with no prototype, gives [target]", t => {
    let obj = Object.create(null);
    t.true(seqEqual(protoChain(obj), [obj]));
});

test("for array, gives the same as object", t => {
    let arr = [];
    t.true(seqEqual(protoChain(arr), [arr, Array.prototype, Object.prototype]));
});

test("for function, gives [target, Function, Object]", t => {
    let f = () => {
    };
    t.true(seqEqual(protoChain(f), [f, Function.prototype, Object.prototype]));
});

test("for wrapped primitive, gives [target, Primitive, Object]", t => {
    let n = new Number(1);
    let b = new Boolean(true);
    let str = new String("a");
    t.true(seqEqual(protoChain(n), [n, Number.prototype, Object.prototype]));
    t.true(seqEqual(protoChain(b), [b, Boolean.prototype, Object.prototype]));
    t.true(seqEqual(protoChain(str), [str, String.prototype, Object.prototype]));
});

test("stopAtProto works", t => {
    let a = Object.create(null);
    let b = Object.create(a);
    let c = Object.create(b);
    t.true(seqEqual(protoChain(c, b), [c]));
    t.true(seqEqual(protoChain(c, a), [c, b]));
})

test("stopAtProto, when stopAt == this", t => {
    let a = Object.create(null);
    t.true(seqEqual(protoChain(a, a), []));
});

test("stopAtProto, when stopAt ∉ this", t => {
    let a = Object.create(null);
    let b = Object.create(a);
    let c = Object.create(b);
    t.true(seqEqual(protoChain(c, {}), [c, b, a]));
});


