import {TargetObject} from "../../abstract";
import {_protos} from "./_protos";
import {_ctor} from "./_ctor";

export function _ctors(target: TargetObject, stopAt?: unknown) {
    let ctors = _protos(target, stopAt).map(x => _ctor(x));
    return ctors;
}
