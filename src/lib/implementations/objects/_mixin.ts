import {TargetObject} from "../../abstract";
import {_closestCommonPrototype} from "./_closest-common-prototype";
import {_keysAll} from "./_keys-all";
import {_descriptorsAll, _descriptorsMap} from "./_descriptors-all";

let skipFor = [null, undefined];
export function _mixin(target: TargetObject, source: TargetObject) {
    if (skipFor.includes(target) || skipFor.includes(source)) return target;

    let commonPrototype = _closestCommonPrototype(target, source);
    let descsSource = _descriptorsMap(source, {
        stopAtProto: commonPrototype
    });

    let descsTarget = _descriptorsMap(target, {
        stopAtProto: commonPrototype
    });

    for (let [key,desc] of descsSource) {
        if (key === "constructor") continue;
        let existingDesc = descsTarget.get(key);
        if (!existingDesc.configurable) {
            continue;
        }
        Object.defineProperty(target, key, desc);
    }

    return target;
}
