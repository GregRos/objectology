import {TargetObject} from "../../abstract";
import {_protoChain} from "./_proto-chain";
import {_protos} from "./_protos";

export function _closestCommonPrototype(a: TargetObject, b: TargetObject): object {
    let protosA = _protos(a);
    let protosB = _protos(b);

    for (let protoA of protosA.reverse()) {
        let inProtoB = protosB.indexOf(protoA);
        if (inProtoB >= 0) {
            return protoA;
        }
    }
    return null;
}
