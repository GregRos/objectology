
export interface PropertyFilter {
    /**
     * Exclude non-enumerable keys.
     */
    noNonEnum?: boolean;
    /**
     * Exclude inherited keys. Will not drill down into the prototype chain.
     */
    noInherited?: boolean;
    /**
     * Will not enumerate the keys owned by this prototype object or its descendants.
     */
    stopAtProto?: unknown;
    /**
     * Skips properties with a getter or setter.
     */
    noGetSetter?: boolean;
}

export interface ExpandedPropertyDescriptor extends PropertyDescriptor {
    owner: unknown;
    name: string | number | symbol;
    depth: number;
}

export interface FunctionAttributes {
    name?: string;
    length?: number;
    implementation: Function;
}

export type TargetObject = unknown;

export type SomeConstructor = {
    (...args): any;
    new(...args): any;
};

export interface ObjectDefs {
    /**Returns all non-symbol keys in `target`, including inherited keys. Use `filter` to exclude some keys.
     * @param target The target.
     * @param filter An object describing which types of keys to exclude, if any.
     *
     * ## Details
     * This function will recurse into the object's prototype chain, extracting all own and inherited non-symbol keys in the object.
     * Numeric keys will be returned in string form.
     */
    strKeys(target: TargetObject, filter?: PropertyFilter): string[];

    /**
     * As [[strKeys]], except that this will retrieve symbol keys and numeric keys in their numeric form.
     * @param target The target.
     * @param filter An object describing which keys to exclude, if any.
     */
    allKeys(target: TargetObject, filter?: PropertyFilter): (string | symbol | number)[];

    /**
     * Returns information about every property in the object, including inherited properties. Use `filter` to exclude some objects.
     * @param target The target.
     * @param filter An object describing which properties to exclude, if any.
     *
     * ## Details
     * Descriptors for all types of properties will be returned.
     * Each descriptor object has a property name, its owner prototype, and its depth in the prototype chain.
     */
    descriptors(target: TargetObject, filter?: PropertyFilter): ExpandedPropertyDescriptor[];

    /**
     Returns the prototype chain of the object, including the object itself.
     * @param target The target.
     *
     * ## Details
     * For primitive types, their wrapper object's prototype chain will be returned.
     * Objects without prototypes will return an empty array.
     */
    prototypes(target: TargetObject): unknown[];

    /**
     * Returns the constructor function specified for the object. If no such function is detected, it will return `null`.
     * @param target The target.
     *
     * ## Details
     * This function will attempt to detect the constructor of a given object using properties such as `target.constructor`.
     * This may not always be successful. For non-objects, `null`, will be returned.
     */
    ctor(target: TargetObject): SomeConstructor | null;

    /**
     * Returns a string name for the object's class or (if it's not an object) type.
     * @param target The target.
     *
     * ## Details
     * This function will attempt to detect the constructor of a given object using properties such as `target.constructor`, but it may also use indirect means.
     * For non-objects, their type names will be returned. Null and undefined will return the strings `null` and `undefined`, respectively.
     */
    className(target: TargetObject): string;

    /**
     * Returns a constructor-chain for the object, which is the same as the prototype chain except with constructors.
     * The array will always be the same length as the object's prototype chain. Missing constructors will be denoted with `null`.
     * @param target The target.
     */
    ctors(target: TargetObject): (SomeConstructor | null)[];

    /**
     * This will configure the property descriptors of the object, changing the attributes of existing properties.
     * @param target The target
     * @param spec For each property, how to set its attributes.
     *
     * ## Details
     * This will modify the property descriptors of existing properties, not create new ones. Every property found in
     * `spec` will be modified to have the attirbutes in the array. Attributes will not be merged.
     *
     * If an attempt is made to reconfigure a non-configurable property, an error will be thrown.
     */
    configureDescriptorsOwn<T>(target: T, spec: {[key in keyof T] : ("no-write" | "no-enum" | "no-config")}): T;

    /**
     * ## Details
     * This is a complex function that will try to reproduce the object, cloning it both structurally and behaviorally,
     * to the extent possible in JavaScript.
     *
     * ### Primitive and scalar objects
     * These will be returned (they don't need to be reproduced).
     *
     * ### General objects
     * Prototype chains, property descriptors, and special properties will be reproduced.
     *
     * ### Functions
     * Functions will not be reproduced. They will be returned as-is.
     *
     * ### Collections
     * Standard collections will be reproduced. Weak collections cannot be reproduced and will throw an error.
     *
     * ### Known binary objects
     * The object will be reproduced and the binary data will be copied.
     *
     * ### Error objects
     * The object will be reproduced.
     *
     * ### Regular expressions
     * Will be reproduced, together with `lastIndex` and other properties.
     *
     * ### Template strings
     * Will be reproduced, together with internal data.
     *

     */
    reproduce<T>(target: T): T;

    /**
     * This will return a plain object containing all of `target`'s properties as own value properties.
     * You can use `filters` to filter out some properties.
     * @param target The target
     */
    flattenObject<T>(target: T, filters?: PropertyFilter): T;


    /**
     * ## Details
     * This will reproduce all property descriptors, including inherited and non-enumerable property descriptors, from
     * all the objects in `others`, in the object `target`.
     *
     * DEAL WITH NULL UNDEFINED
     * @param target
     * @param others
     */
    extend<T>(target: T, ...others: any[]): T;

    /**
     * The same as [[reproduce]], but this will recurse into the own members of the object.
     * @param target
     */
    reproduceDeep<T>(target: T): T;

    /**
     * Creates a wrapper function around another function, with the given name and declared length.
     */
    createFunction<F>(attributes : FunctionAttributes): F;


}
export interface TypeCheck {
    isClass(ctor : Function): ctor is SomeConstructor;

    isClassMethod(ctor: Function): ctor is (...args) => any;

    isArrow(f : Function): f is (...args) => any;

    isAsync(f: Function) : boolean;


}
