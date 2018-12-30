import {TargetObject} from "../abstract";
import {_protoChain} from "./_proto-chain";

export function _protos(target: TargetObject, stopAt?: unknown) {
    let chain = _protoChain(target, stopAt);
    if (chain[0] === target) chain.shift();
    return chain;
}
