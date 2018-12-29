import {PropertyFilter} from "../../abstract";
import {_descriptorsAll} from "./_descriptors-all";
import {TargetObject} from "../../abstract";

export function _keysAll(target: TargetObject, filter?: PropertyFilter) {
    return _descriptorsAll(target, filter).map(x => x.key);
}
