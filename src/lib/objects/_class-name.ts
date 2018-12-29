import {TargetObject} from "../abstract";
import {_getPropertyOwn} from "./_get-property-own";
import {_protoChain} from "./_proto-chain";

export function _classNameOwn(target: TargetObject): string {
    // We will try to get the toStringTag of the object first
    let tag = _getPropertyOwn(target, Symbol.toStringTag);
    if (tag) return tag;

    // if that doesn't exist, we'll try to get the name of the constructor.
    let ctor = _getPropertyOwn(target, "constructor");

    // When dealing with classes, a child constructor has a parent constructor
    // as a prototype. We don't want to get the parent constructor's ctor name
    // here.
    let ctorName = ctor && _getPropertyOwn(ctor, "name");
    if (ctorName) return ctorName;
    // if there is none, or it doesn't have a name, return ""

    return "";
}

export function _className(target: TargetObject): string {
    if (target === null) return "Null";
    if (target === undefined) return "Undefined";

    // Handles a bizarre case of prototype corruption
    if (typeof target === "function") return "Function";
    let protos = _protoChain(target);
    for (let proto of protos) {
        let clsName = _classNameOwn(proto);
        if (clsName) return clsName;
    }

    // The fallback is just returning Object.
    return "Object";
}
