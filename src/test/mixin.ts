import test from "ava";
import {mixin} from "../lib";
import _ = require("lodash/fp");

function stripPrototype(o: any) {
    Object.setPrototypeOf(o, null);
    return o;
}

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
    let target = stripPrototype({a: 1});
    let source = stripPrototype({b: 1});
    let result = mixin(target, source);
    t.is(result, target);
    t.deepEqual(result, {
        a: 1,
        b: 1
    });
    t.is(Object.getPrototypeOf(result), null);
});

