import {TargetObject} from "../../abstract";
import {_protoChain} from "./_proto-chain";

export function _closestCommonPrototype(...objs: TargetObject[]): object {
    let mapped = objs.map(obj => _protoChain(obj)).sort((a, b) => a.length - b.length);
    if (mapped.length === 0) return null;
    if (mapped.length === 1) {
        if (mapped[0].length === 0) return null;
        return mapped[0][0];
    }
    let shortest = mapped.shift();
    let sets = mapped.map(arr => new Set(arr));

    elementwise:
    for (let x of shortest) {
        for (let set of sets) {
            if (!set.has(x)) {
                continue elementwise;
            }
        }
        return x;
    }

    return null;
}
