import {
    ExpandedPropertyDescriptor,
    PropertyFilter,
    TargetObject
} from "../abstract";
import {_protoChain} from "./_proto-chain";
import {_keysOwn} from "./_keys-own";
import {_properifyKey} from "./_properify-key";

export function _descriptorsMap(
    target: TargetObject,
    filter?: PropertyFilter): Map<PropertyKey, ExpandedPropertyDescriptor> {
    let descs = new Map<PropertyKey, ExpandedPropertyDescriptor>();
    let protos = filter.noInherited ? [target] : _protoChain(target,
        filter.stopAtProto
    );
    for (let i = 0; i < protos.length; i++) {
        let proto = protos[i];
        for (let key of _keysOwn(proto)) {
            let desc = Object.getOwnPropertyDescriptor(proto, key);
            if (!desc.enumerable && filter.noNonEnum) continue;
            if ((desc.get || desc.set) && filter.noGetSetter) continue;
            let richDesc: ExpandedPropertyDescriptor = {
                ...desc,
                key: _properifyKey(key),
                depth: i,
                owner: proto
            };
            if (!descs.has(key)) {
                descs.set(key, richDesc);
            }
        }
    }
    return descs;
}

export function _descriptorsAll(
    target: TargetObject,
    filter?: PropertyFilter): ExpandedPropertyDescriptor[] {
    return Array.from(_descriptorsMap(target, filter).values());
}
