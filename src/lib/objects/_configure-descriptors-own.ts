import {DefineDescriptors} from "../abstract";
import {_keysOwn} from "./_keys-own";
import {_getPropertyOwn} from "./_get-property-own";

export function _configureDescriptorsOwn<T>(
    target: T, config: DefineDescriptors<T> | ((a: PropertyDescriptor, key: PropertyKey) => void)) {
    for (let key of _keysOwn(target)) {
        let attrs = _getPropertyOwn(config, key);
        if (!attrs) continue;
        let desc = Object.getOwnPropertyDescriptor(target, key);
        if (typeof attrs === "function") {
            attrs(desc, key);
        } else {
            desc.writable = !attrs.includes("no-write");
            desc.enumerable = !attrs.includes("no-enum");
            desc.configurable = !attrs.includes("no-config");
        }

        Object.defineProperty(target, key, desc);
    }
    return target;
}
