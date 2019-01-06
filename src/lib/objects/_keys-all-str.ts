import {PropertyFilter, TargetObject} from "../abstract";
import {_descriptorsAll} from "./_descriptors-all";

export function _keysAllStr(target: TargetObject, filter?: PropertyFilter) {
    return _descriptorsAll(target, filter).map(x => typeof x.key === "number" ? `${x.key}` : x.key as string)
    .filter(x => typeof x === "string");
}
