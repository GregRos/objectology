import test from "ava";
import {_getPropertyOwn} from "../lib/objects/_get-property-own";

test("succeed getting own property", t => {
    t.is(_getPropertyOwn({a: 4}, "a"), 4);
});

test("inherited property yields undefined", t => {
    t.is(_getPropertyOwn(Object.prototype, "hasOwnProperty"), Object.prototype.hasOwnProperty);
    t.is(_getPropertyOwn({a: 4}, "hasOwnProperty"), undefined);
});

test("for null/undefined throws error", t => {
    t.throws(() => _getPropertyOwn(null, "x"));
    t.throws(() => _getPropertyOwn(undefined, "a"));
});

test("for primitive yields nothing", t => {
    t.is(_getPropertyOwn(4, "hasOwnProperty"), undefined);
    t.is(_getPropertyOwn(true, "hasOwnProperty"), undefined);
    t.is(_getPropertyOwn("", "hasOwnProperty"), undefined);
    t.is(_getPropertyOwn(Symbol(""), "hasOwnProperty"), undefined);

});
