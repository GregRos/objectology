import {TargetObject} from "./index";

const nonScalarTypes = [
    "function",
    "object"
];

function getImplicitCtor(typeofResult: string) {
    switch (typeofResult) {
        case "number": return Number;
        case "string": return String;
        case "symbol": return Symbol;
        case "boolean": return Boolean;
    }
    return null;
}

export class Impl {
    isScalar(target: TargetObject) {
        return target === null || target === undefined || !nonScalarTypes.includes(typeof target);
    }

    protoChain(target: TargetObject) {
        if (target === null || target === undefined) return [];
        let protos = [];
        function recurse(proto: unknown) {
            if (!proto) return;
            protos.push(proto);
            let pproto = Object.getPrototypeOf(proto);
            recurse(pproto);
        }
        recurse(target);
        return protos;
    }

    prototypes(target: TargetObject) {
        let chain = this.protoChain(target);
        chain.shift();
        return chain;
    }

    ctor(target: TargetObject) {
        if (target === null || target === undefined) return null;

        let proto = Object.getPrototypeOf(target);
        if (!proto) return null;
        return proto.constructor;
    }

    ctors(target: TargetObject) {
        let ctors = this.prototypes(target).map(x => this.ctor(x));
        return ctors;
    }

    strKeys(target: TargetObject) {
        let keys = [];
        for (let proto of this.protoChain(target)) {
            keys.push(...Object.getOwnPropertyNames(proto));
        }
        return keys;
    }

    realKeys(target: TargetObject) {
        let keys = [];
        for (let proto
of this.protoChain(target)) {
        }
    }

    descriptors(target: TargetObject) {
        let descs = [];
        for (let proto of this.protoChain(target)) {
            descs.push(...Object.getOwnPropertyDescriptors(proto));
        }

    }
}



export module Impl {
    export function prototypes(target: TargetObject) {
        let protos = [] as object[];
        if (typeof target === "function" ){
        }
        if (typeof target !== "object"){
            return [];
        }
        function recurse(proto: any) {
            if (!proto) return;
            protos.push(proto);

        }
    }
}