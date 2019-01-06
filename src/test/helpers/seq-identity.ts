import _ = require("lodash/fp");

export function seqEqual<T>(result: T[], expected: T[]) {
    if (!result || !expected) return result === expected;
    if (result.length !== expected.length) return false;

    for (let i = 0; i < result.length; i++) {
        if (result[i] !== expected[i]) return false;
    }
    return true;
}

export function createChain(own: any, ...protos: object[]) {
    let last = null;
    for (let proto of protos.reverse()) {
        if (!last) {
            last = proto;
        } else {
            last = Object.setPrototypeOf(last, _.clone(proto));
        }
    }
    return Object.setPrototypeOf(_.clone(own), last);
}

export function isProtoChainEqual(what: any, chain: any) {

}
