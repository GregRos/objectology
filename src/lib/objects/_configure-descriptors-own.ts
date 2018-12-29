import {DefineDescriptors} from "../abstract";
import {_keysOwn} from "./_keys-own";

export function _configureDescriptorsOwn<T>(
    target: T, config: DefineDescriptors<T>) {
    for (let key of _keysOwn(target)) {
        let attrs = config[key];
        if (!attrs) continue;
        let desc = Object.getOwnPropertyDescriptor(target, key);
        desc.writable = !attrs.includes("no-write");
        desc.enumerable = !attrs.includes("no-enum");
        desc.configurable = !attrs.includes("no-config");
        Object.defineProperty(target, key, desc);
    }
    return target;
}
