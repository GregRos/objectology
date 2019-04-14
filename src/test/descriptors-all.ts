import {ExpandedPropertyDescriptor} from "../lib/abstract";
import _ = require("lodash");
import test from "ava";
import {descriptorsAll} from "../lib";
import defineProperty = Reflect.defineProperty;
import {setEqual} from "./helpers/seq-identity";

type PropShType =
    // value property
    [string, any, string] |
    // getsetter property
    [string, () => any, (x: any) => void, string];

function definePropertyDesc(target, depth, props: PropShType[]): any[] {
    let arr = [];
    if (typeof depth !== "number" || typeof target !== "object") throw new Error("Probably test is bad!");
    for (let x of props) {
        if (x.length === 4) {
            var [name, get, set, wec] = x;
        } else {
            var [name, value, wec] = x;
        }
        let desc = {
            key: name,
            owner: target,
            enumerable: wec.includes("e"),
            configurable: wec.includes("c"),
            depth: depth
        } as any;

        if (get || get) {
            desc.get = get || undefined;
            desc.set = set || undefined;
        } else {
            desc.writable = wec.includes("w");
            desc.value = value;
        }
        arr.push(desc);
        Object.defineProperty(target, name, desc);
    }
    return arr;
}

function uniformOrder(target) {
    return _.orderBy(target, [x => x.depth, x => x.key]);
}

test("depth 0 - 1 key", t => {
    let obj = {
        a: "a"
    };
    Object.setPrototypeOf(obj, null);

    let keys = descriptorsAll(obj).map(x => x.key);

    t.deepEqual(keys, ["a"]);
});

test("depth 0 - 2 keys", t => {
    let obj = {
        a: "a",
        b: "b"
    };

    Object.setPrototypeOf(obj, null);

    let keys = descriptorsAll(obj).map(x => x.key);
    t.deepEqual(new Set(keys), new Set(["a", "b"]));
});

test("descriptor matches", t => {
    let descriptor = {
        configurable: false,
        writable: true,
        enumerable: false,
        value: "x"
    };
    let obj = Object.create(null, {
        a: descriptor
    });

    let descs = descriptorsAll(obj);

    let descriptorWithExtras : ExpandedPropertyDescriptor = {
        ...descriptor,
        owner: obj,
        depth: 0,
        key: "a"
    };
    t.deepEqual(descs, [descriptorWithExtras])
});

test("depth 0, symbol key", t => {
    let symb = Symbol("hi");
    let obj = Object.create(null);
    let descriptor = {
        key: symb,
        value: 11,
        configurable: false,
        writable: false,
        enumerable: false,
        owner: obj,
        depth: 0
    };

    Object.defineProperty(obj, symb, descriptor);

    t.deepEqual(descriptorsAll(obj), [descriptor]);
});

test("depth 1, one property each", t => {
    let parent = Object.create(null);
    parent["a"] = 1;

    let child = Object.create(parent);
    child["b"] = 2;

    let descs = descriptorsAll(child);

    let onlyKeyOwnerAndDepth = descs.map(x => _.pick(x, "key", "depth", "owner"));

    t.true(...setEqual(onlyKeyOwnerAndDepth, [{
        key: "a",
        owner: parent,
        depth: 1
    }, {
        key: "b",
        owner: child,
        depth: 0
    }]))
});

test("non-enum property", t => {
    let a = Object.create(null, {
        a: {
            enumerable: false,
            value: 5
        }
    });

    let keys = descriptorsAll(a).map(x => x.key);

    t.deepEqual(keys, ["a"]);
});

test("depth 0 - getter, verify descriptor", t => {
    let func = () => 1;
    let obj = Object.create(null, {
        a: {
            get: func,
            configurable: true,
            enumerable: false
        }
    });

    let descs = descriptorsAll(obj);
    t.deepEqual(descs, [{
        key: "a",
        depth: 0,
        owner: obj,
        configurable: true,
        enumerable: false,
        get: func,
        set: undefined
    }]);
});

test("depth 0 - getter+setter", t => {
    let g = () => 1;
    let s = () => {};

    let obj = Object.create(null, {
        a: {
            get: g,
            set: s
        }
    });

    let descs = descriptorsAll(obj).map(x => _.pick(x, "get", "set"));

    t.deepEqual(descs, [{
        get: g,
        set: s
    }]);
});

test("on primitive, the same as on Primitive", t => {
    let x = Number.prototype;

    let protoDescs = descriptorsAll(Number.prototype);

    let numDescs = descriptorsAll(0);

    t.deepEqual(protoDescs, numDescs);
});

test("on null/undefined, empty", t => {
    t.deepEqual(descriptorsAll(null), []);
    t.deepEqual(descriptorsAll(undefined), []);
});

test("filter: no-inherited", t => {
    let base = {a: 1};
    Object.setPrototypeOf(base, null);
    let child = Object.create(base);
    child.b = 2;
    let keys = descriptorsAll(child, {
        noInherited: true
    }).map(x => x.key);

    t.deepEqual(keys, ["b"]);
});

test("filter: no-getsetter", t => {
    let obj = {
        a: 1,
        get b() {
            return 2
        },
        set c(x) {

        }
    };
    Object.setPrototypeOf(obj, null);

    let keys = descriptorsAll(obj, {
        noGetSetter: true
    }).map(x => x.key);

    t.deepEqual(keys, ["a"]);
});

test("filter: no-nonenum", t => {
    let obj = Object.create(null, {
        a: {
            enumerable: false,
            value: "a"
        }
    });

    let keys = descriptorsAll(obj, {
        noNonEnum: true
    }).map(x => x.key);

    t.deepEqual(keys, []);
});

test("filter: downto prototype", t => {
    let a = Object.create({
        a: 1
    });

    Object.setPrototypeOf(a, null);

    let b = Object.create(a);
    b.b = 2;

    let c = Object.create(b);
    c.c = 3;

    let keys = descriptorsAll(c, {
        stopAtProto: a
    }).map(x => x.key);
    t.true(setEqual(keys, ["b", "c"])[0]);
});




