import {TargetObject} from "../../abstract";

export function _protoChain(target: TargetObject, stopAt?: unknown) {
    if (target == null) return [];
    let protos = [];
    function recurse(proto: unknown) {
        if (proto == null || stopAt === proto) return;
        protos.push(proto);
        let pproto = Object.getPrototypeOf(proto);
        recurse(pproto);
    }
    recurse(target);
    return protos;
}
