import {ExpandedPropertyDescriptor} from "../lib/abstract";
import _ = require("lodash");
import test from "ava";
import {descriptorsAll} from "../lib";
import defineProperty = Reflect.defineProperty;

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


test("depth0 - test avoids too much shorthand", t => {
    let obj = Object.create(null);
    let expected = uniformOrder(definePropertyDesc(obj, 0, [
        ["key1", "a", "wec"],
        ["key2", "b", "w"],
        ["key3", "c", "c"]
    ]));
    let actual = uniformOrder(descriptorsAll(obj));
    let key1 = actual.find(x => x.key === "key1");
    let key2 = actual.find(x => x.key === "key2");
    let key3 = actual.find(x => x.key === "key3");
    t.deepEqual(key2, {
        key: "key2",
        owner: obj,
        enumerable: false,
        writable: true,
        configurable: false,
        depth: 0,
        value: "b"
    });

    t.deepEqual(key3, {
        key: "key3",
        owner: obj,
        enumerable: false,
        writable: false,
        configurable: true,
        value: "c",
        depth: 0
    });
});

test("depth0 - basic test with shorthand", t => {
    let obj = Object.create(null);
    let expected = uniformOrder(definePropertyDesc(obj, 0, [
        ["key1", "a", "wec"],
        ["key2", "b", "w"],
        ["key3", "c", "c"]
    ]));

    let actual = uniformOrder(descriptorsAll(obj));

    t.deepEqual(actual, expected);
});

test("depth0 - getsetters", t => {
    let obj = Object.create(null);
    let expected = uniformOrder(definePropertyDesc(obj, 0, [
        ["only-get", () => 5, null, "e"],
        ["only-set", null, x => {}, "ec"],
        ["both", () => 5, x => {}, "c"]
    ]));

    let actual = uniformOrder(descriptorsAll(obj));

    t.deepEqual(actual, expected);
});

test("depth0 - object valued property", t => {
    let obj = Object.create(null);

    let expected = [
        ...uniformOrder(definePropertyDesc(obj, 0, [
            ["x", {}, "e"],
            ["y", [], "c"]
        ]))
    ];

    let actual = uniformOrder(descriptorsAll(obj));

    t.is(actual.find(x => x.key === "x").value, expected.find(x => x.key === "x").value);
});

test("depth1 - basic mix", t => {
    let obj = Object.create(null),
        obj2 = Object.create(obj);

    let expected = definePropertyDesc(obj, 1, [
        ["value", "v", "w"],
        ["getter", () => 5, x => {}, "ec"]
    ]).concat(definePropertyDesc(obj2, 0, [
        ["value2", "v2", ""],
        ["setter", null, () => {}, "e"]
    ]));

    expected = uniformOrder(expected);

    let actual = uniformOrder(descriptorsAll(obj2));

    t.deepEqual(actual, expected);
});

test()

