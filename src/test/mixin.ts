import test from "ava";
import {mixin} from "../lib";
import {createChain} from "./helpers/seq-identity";
import _ = require("lodash/fp");

test("mixin into null/undefined gives null/undefined", t => {
    t.is(mixin(null, {a: 1}), null);
    t.is(mixin(undefined, {a: 1}), undefined);
});

test("mixing from null/undefined gives same object", t => {
    let a = {a: 1};
    let result = mixin(_.clone(a), null);
    t.deepEqual(result, a);
    result = mixin(result, undefined);
    t.deepEqual(result, a);
});

test("just source gives source", t => {
    let obj = {a: 1};
    let cloned = _.clone(obj);
    let mixedIn = mixin(cloned);
    t.is(mixedIn, cloned);
    t.deepEqual(mixin(cloned), obj)
});

test("(null prototype) works with 1x source", t => {
    let target = createChain({a: 1});
    let source = createChain({b: 1});
    let result = mixin(target, source);
    t.is(result, target);
    t.deepEqual(result, {
        a: 1,
        b: 1
    });
    t.is(Object.getPrototypeOf(result), null);
});

test("(null prototype) works with 2x source", t => {
    let target = createChain({a: 1});
    let source1 = createChain({b: 2});
    let source2 = createChain({c: 3});
    let result = mixin(target, source1, source2);
    t.is(result, target);
    t.deepEqual(result, {
        a: 1,
        b: 2,
        c: 3
    });
});

test("(target, source); target has prototype", t => {
    let target = createChain({a: 1}, {b: 1});
    let source = createChain({c: 1});
    let result = mixin(target, source);
    t.deepEqual(result, {
        a: 1,
        b: 1,
        c: 1
    });
});

test("(target, source); both have different prototypes", t => {
    let target = createChain({a: 1}, {b: 1});
    let source = createChain({c: 1}, {d: 1});
    let result = mixin(target, source);
    t.deepEqual(result, {
        a: 1,
        b: 1,
        c: 1,
        d: 1
    });
});

