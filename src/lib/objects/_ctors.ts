import {TargetObject} from "../abstract";
import {_protos} from "./_protos";
import {_ctor, _ctorFromProto} from "./_ctor";

export function _ctors(target: TargetObject, stopAt?: unknown) {
    let ctors = _protos(target, stopAt).map(x => _ctorFromProto(x));
    return ctors;
}
