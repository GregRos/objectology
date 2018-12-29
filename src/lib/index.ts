import {DefineDescriptors, ExpandedPropertyDescriptor, PropertyFilter, SomeConstructor, TargetObject} from "./abstract";
import {_keysAllStr} from "./implementations/objects/_keys-all-str";
import {_keysAll} from "./implementations/objects/_keys-all";
import {_keysOwn} from "./implementations/objects/_keys-own";
import {_descriptorsAll} from "./implementations/objects/_descriptors-all";
import {_protoChain} from "./implementations/objects/_proto-chain";
import {_protos} from "./implementations/objects/_protos";
import {_ctor} from "./implementations/objects/_ctor";
import {_className, _classNameOwn} from "./implementations/objects/_class-name";
import {_ctors} from "./implementations/objects/_ctors";
import {_configureDescriptorsOwn} from "./implementations/objects/_configure-descriptors-own";
import {_mixin} from "./implementations/objects/_mixin";
import {_closestCommonPrototype} from "./implementations/objects/_closest-common-prototype";

/**
 * Returns all non-symbol keys in `target`, including inherited keys. Use `filter` to exclude some keys.
 *
 * ### Details
 * This function will recurse into the object's prototype chain, extracting all own and inherited non-symbol keys in the object.
 * Numeric keys will be returned in string form.
 *
 * @param target The target.
 * @param filter An object describing which types of keys to exclude, if any.
 * @see keysAll
 */
export function keysAllStr(target: TargetObject, filter?: PropertyFilter): string[] {
    return _keysAllStr(target, filter);
}

/**
 * As [[allKeysStr]], except that this will retrieve symbol keys and numeric keys in their numeric form.
 * @param target The target.
 * @param filter An object describing which keys to exclude, if any.
 *
 * @see allKeysStr
 */
export function keysAll(target: TargetObject, filter?: PropertyFilter): PropertyKey[] {
    return _keysAll(target, filter);
}

/**
 * Returns all the own keys of an object, including non-enumerable keys.
 * @param target The target.
 */
export function keysOwn(target: TargetObject): PropertyKey[] {
    return _keysOwn(target);
}

/**
 * Returns information about every property in the object, including inherited properties. Use `filter` to exclude some objects.
 *
 * @param target The target.
 * @param filter An object describing which properties to exclude, if any.
 *
 */
export function descriptorsAll(target: TargetObject, filter?: PropertyFilter): ExpandedPropertyDescriptor[] {
    return _descriptorsAll(target, filter);
}

/**
 * Returns the prototype chain of the object, including the object itself.
 *
 * ## Details
 * For primitive types, their wrapper object's prototype chain will be used.
 * For objects without prototypes, a one-element array containing `target` will be returned.
 *
 * @param target The target.
 * @param stopAtProto The prototype at which to stop.
 */
export function protoChain(target: TargetObject, stopAtProto?: unknown): unknown[] {
    return _protoChain(target, stopAtProto);
}
/**
 * Returns the prototype chain of the object, not including the object itself.

 * ## Details
 * For primitive types, their wrapper object's prototype chain will be returned.
 * For objects without prototypes, an empty array will be returned.
 *
 * @param target The target.
 * @param stopAtProto The prototype at which to stop.
 */
export function protos(target: TargetObject, stopAtProto?: unknown): unknown[] {
    return _protos(target, stopAtProto);
}

/**
 * Returns the object's constructor function. If the object doesn't have one, `null` will be returned.
 * Note that `null` will be returned even if the object has a parent with a constructor.
 *
 * ## Details
 * This function will attempt to detect the constructor of a given object using properties such as `target.constructor`.
 * This may not always be successful. For non-objects, `null`, will be returned.
 *
 * @param target The target.

 */
export function ctor(target: TargetObject): SomeConstructor | null {
    return _ctor(target);
}

/**
 * Returns a string name for an object's  prototype, or an empty string if no such name is found.
 * @param target The target object.
 * @see className
 */
export function classNameOwn(target: TargetObject): string {
    return _classNameOwn(Object.getPrototypeOf(target));;
}

/**
 * Returns a string name for one of the object's prototypes. `"Object"` is returned as a fallback.
 *
 * ## Details
 * This function will try to detect the name of the object's constructor or type primarily based on the result of
 * a `toString` call and the `toStringTag` special symbol.
 *
 * @param target The target.
 * @see classNameOwn
 *
 */
export function className(target: TargetObject): string {
    return _className(target);
}

/**
 * Returns a constructor-chain for the object, which is the same as the prototype chain except with constructors.
 *
 * ## Details
 * The array will always be the length of the object's prototype chain (excluding itself).
 * Prototypes without constructors will be marked with `null`s.
 *
 * @param target The target.
 */
export function ctors(target: TargetObject, stopAtProto?: unknown): (SomeConstructor | null)[] {
    return _ctors(target);
}

/**
 * This will configure the property descriptors of the object, changing the attributes of existing properties.
 *
 * ## Details
 * This will modify the property descriptors of existing properties, not create new ones. Every property found in
 * `spec` will be modified to have the attirbutes in the array. Attributes will not be merged.
 *
 * If an attempt is made to reconfigure a non-configurable property, an error will be thrown.
 *
 * @param target The target
 * @param spec For each property, how to set its attributes.
 */
export function configureDescriptorsOwn<T>(target: T, spec: DefineDescriptors<T>): T {
    return _configureDescriptorsOwn(target, spec);
}

/**
 * Mixes all property descriptors belonging to each objects in `sources` into `target`, including inherited members.
 *
 * ## Details
 * This function will define all descriptors present in `sources` on `target`, overwriting existing descriptors,
 * with the exception of non-configurable ones that can't be modified.
 * The descriptors will be defined exactly as they are in each of the `sources` objects.
 *
 * Although inherited descriptors are included, descriptors present in both objects via prototype inheritance
 * (i.e. if they have the same prototype) are not transferred.
 *
 * @param target Thet target object.
 * @param sources The sources objects.
 * @see descriptorsAll
 */
export function mixin<T>(target: T, ...sources: TargetObject[]) {
    return sources.reduce((acc, cur) => _mixin(acc, cur), target);
}

/**
 * Returns the closest shared prototype of two objects. For identical objects, their direct prototype will be returned.
 * @param a The first object.
 * @param b The second object.
 */
export function closestCommonPrototype(a: TargetObject, b: TargetObject): object {
    return _closestCommonPrototype(a, b);
}


