import {TargetObject} from "../../abstract";

export function _getPropertyOwn(target: TargetObject, key: PropertyKey) {
    return Object.prototype.hasOwnProperty.call(target, key) ? (target as object)[key] : undefined;
}
