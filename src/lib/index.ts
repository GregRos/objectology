import {
    DefineDescriptors,
    ExpandedPropertyDescriptor,
    PropertyFilter,
    SomeConstructor,
    TargetObject
} from "./abstract";
import {_keysAllStr} from "./objects/_keys-all-str";
import {_keysAll} from "./objects/_keys-all";
import {_keysOwn} from "./objects/_keys-own";
import {_descriptorsAll} from "./objects/_descriptors-all";
import {_protoChain} from "./objects/_proto-chain";
import {_protos} from "./objects/_protos";
import {_ctor} from "./objects/_ctor";
import {_className, _classNameOwn} from "./objects/_class-name";
import {_ctors} from "./objects/_ctors";
import {_configureDescriptorsOwn} from "./objects/_configure-descriptors-own";
import {_mixin} from "./objects/_mixin";
import {_nearestCommonPrototype} from "./objects/_nearest-common-prototype";

/**
 * Returns all non-symbol keys in `target`, including inherited keys. Use
 * `filter` to exclude some keys.
 *
 * ### Details
 * This function will recurse into the object's prototype chain,
 * extracting all own and inherited non-symbol keys in the object, even
 * non-enumerable ones. Array indexes and similar will be returned in their
 * key-like string form.
 *
 * @param target The target.
 * @param filter An object describing which types of keys to exclude, if any.
 * @see keysAll
 */
export function keysAllStr(
    target: TargetObject, filter?: PropertyFilter): string[] {
    return _keysAllStr(target, filter);
}

/**
 * As [[allKeysStr]], except that this will retrieve symbol keys and numeric
 * keys in their numeric form.
 * @param target The target.
 * @param filter An object describing which keys to exclude, if any.
 *
 * @see allKeysStr
 */
export function keysAll(
    target: TargetObject, filter?: PropertyFilter): PropertyKey[] {
    return _keysAll(target, filter);
}

/**
 * Returns all the own keys of an object, including non-enumerable keys.
 * This is identical to the combination of `getOwnPropertyNames` and
 * `getOwnPropertySymbols`.
 *
 * Keys that are array index-like are returned as numbers.
 * @param target The target.
 */
export function keysOwn(target: TargetObject): PropertyKey[] {
    return _keysOwn(target);
}

/**
 * Returns every property descriptor in the object or inherited by the
 * object, with information about where the descriptor was found. By
 * default, all property descriptors are returned; use `filter` to exclude
 * some descriptors.
 *
 * @param target The target.
 * @param filter An object describing which properties to exclude, if any.
 *
 */
export function descriptorsAll(
    target: TargetObject,
    filter?: PropertyFilter): ExpandedPropertyDescriptor[] {
    return _descriptorsAll(target, filter);
}

/**
 * Returns the prototype chain of the object, including the object itself
 * (if it is a prototype - primitives are not, and will not appear in the
 * chain).
 *
 * Use `stopAtProto` to indicate a prototype at which to stop going down the
 * prototype chain. This prototype will not be returned.
 *
 * The prototype chain is in decreasing order of nearness to the target
 * object. For example,
 *
 * ```js
 * function Example() {};
 *
 * let obj = new Example();
 *
 * protoChain(obj);
 * ```
 *
 * Will yield `[obj, Example.prototype, Object.prototype]`.
 * @param target The target.
 * @param stopAtProto The prototype at which to stop.
 */
export function protoChain(
    target: TargetObject, stopAtProto?: unknown): unknown[] {
    return _protoChain(target, stopAtProto);
}

/**
 * Returns the prototypes of the object, not including the object itself.
 * This is the same as [[protoChain]], except the object will not appear in
 * the chain. For primtives, the two functions return the same array.
 *
 * @param target The target.
 * @param stopAtProto The prototype at which to stop.
 */
export function protos(target: TargetObject, stopAtProto?: unknown): unknown[] {
    return _protos(target, stopAtProto);
}

/**
 * Returns the object's immediate constructor function. If the object
 * doesn't have one, `null` will be returned. Note that `null` will be
 * returned even if the object has a prototype with a constructor.
 *
 * @param target The target.
 */
export function ctor(target: TargetObject): SomeConstructor | null {
    return _ctor(target);
}

/**
 * Returns a string name for an object's immediate prototype, or an empty string
 * if no such name is found.
 *
 * ## Details
 * This function gets the name from the object's `.constructor` property,
 * the `Symbol.toStringTag` key, or a few other sources.
 *
 * The benefit of using this function over [[className]] is that
 * [[classNameOwn]] will not identify an object as having the class name of
 * its ancestors. This allows you to disintuish between a prototype and
 * objects having that prototype.
 *
 * Note that when using this function to identify an object's prototype,
 * custom objects called (e.g.) `Set` or `Object` will not be
 * distinguishable from the built-in objects. However, in spite of this,
 * this function is a pretty good way to determine an arbitrary object's
 * prototype, and it's used internally to do so.
 *
 * @param target The target object.
 * @see className
 */
export function classNameOwn(target: TargetObject): string {
    return _classNameOwn(Object.getPrototypeOf(target));
}

/**
 * Returns a string name that can be used to describe an object's prototype.
 * See [[classNameOwn]] for more information about how this is done.
 *
 * The main difference is that [[classNameOwn]] looks at the object's
 * immediate prototype for a name, while this function will look higher up
 * the prototype chain, giving prototypes and objects having that prototype
 * potentially identical names.
 *
 * Another difference is that this function will return `"Object"` for objects
 * having no prototype, while [[classNameOwn]] returns an empty string (to
 * indicate no prototype was found).
 *
 * This function is more helpful if you want to print out the type of an
 * object for e.g. debugging, while the other function is helpful if you
 * want to identify an object's prototype.
 *
 *
 * @param target The target.
 * @see classNameOwn
 *
 */
export function className(target: TargetObject): string {
    return _className(target);
}

/**
 * Returns a constructor chain for the object, which is the same as the
 * prototype chain except with constructors. The length of the chain is
 * identical to the length of the return of [[protos]] for the object.
 *
 * @param target The target.
 * @param stopAtProto The prototype at which to stop listing the constructors.
 */
export function ctors(
    target: TargetObject, stopAtProto?: unknown): (SomeConstructor | null)[] {
    return _ctors(target);
}

/**
 * This will configure the property descriptors of the object, changing the
 * attributes of existing descriptors.
 *
 * ## Details
 * This will modify the property descriptors of existing properties, not create
 * new ones. Every property found in `spec` will be modified to have the
 * attirbutes in the array. Attributes will not be merged.
 *
 * If an attempt is made to reconfigure a non-configurable property, an error
 * will be thrown.
 *
 * @param target The target
 * @param spec For each property, how to set its attributes.
 */
export function configureDescriptorsOwn<T>(
    target: T, spec: DefineDescriptors<T> | ((x : PropertyDescriptor, key: PropertyKey) => void)): T {
    return _configureDescriptorsOwn(target, spec);
}

/**
 * Mixes all property descriptors belonging to each objects in `sources` into
 * `target`, including inherited members.
 *
 * ## Details
 * This function will define all descriptors present in `sources` on `target`,
 * overwriting existing descriptors, with the exception of non-configurable
 * ones that can't be modified. The descriptors will be defined exactly as they
 * are in each of the `sources` objects.
 *
 * Although inherited descriptors are included, descriptors present in both
 * objects via prototype inheritance
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
 * Returns the closest prototype shared by all objects.
 *
 * For two identical objects, their nearest common prototype is the object
 * itself. For two identical primitives (or just one), however, the nearest
 * common prototype is the wrapper prototype. This is because primitives are
 * not actually part of the prototype chain at all.
 *
 * @param args All objects.
 */
export function nearestCommonPrototype(...args: TargetObject[]): object {
    return _nearestCommonPrototype(...args);
}


