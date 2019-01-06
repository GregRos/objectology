export interface PropertyFilter {
    /**
     * Exclude non-enumerable keys.
     */
    noNonEnum?: boolean;

    /**
     * Exclude inherited keys.
     */
    noInherited?: boolean;
    /**
     * Will not enumerate the keys owned by this prototype object or its
     * descendants.
     */
    stopAtProto?: unknown;
    /**
     * Skips properties with a getter or setter.
     */
    noGetSetter?: boolean;
}

export interface ExpandedPropertyDescriptor extends PropertyDescriptor {
    owner: unknown;
    key: PropertyKey
    depth: number;
}

export type DefineDescriptors<T> = {
    [key in keyof T]?: ("no-enum" | "no-write" | "no-config")[];
}
export type TargetObject = unknown;
export type SomeConstructor = {
    (...args): any;
    new(...args): any;
};
