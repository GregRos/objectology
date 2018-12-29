import {TargetObject} from "../abstract";
import {_getPropertyOwn} from "./_get-property-own";

export function _ctorFromProto(target: TargetObject) {
    if (target == null) return target;
    let proto = target as Object;
    return _getPropertyOwn(proto, "constructor") || null;

}

export function _ctor(target: TargetObject) {
    if (target === null || target === undefined) return null;
    let proto = Object.getPrototypeOf(target);
    return _ctorFromProto(proto);
}
