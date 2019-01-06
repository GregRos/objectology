import {_descriptorsAll} from "./_descriptors-all";
import {PropertyFilter} from "../abstract";

/**
 * This function will take the prototype-rich object `source` and create a new,
 * simpler object that has all of the descriptors of the old one but with fewer
 * prototypes.
 *
 * For example, an array object `[a, b]` will be flattened down to the plain
 * object `{0: a, 1: b}`.
 *
 * `source` will be simplified down to the prototype `base`. That
 * means the descriptors of all prototypes down to `base` will be reproduced
 * in the returened object as own descriptors, and `base` will be the returned
 * object's prototype. The argument `base` defaults to `Object.prototype`.
 *
 * If `base` is not a prototype of `source`, then `source` will be simplified
 * down to the closest prototype shared with `base`.
 *
 * @param source The target, prototype-rich object to simplify.
 * @param base The prototype of the returned, simplified object.
 * @private
 */
export function _simplify(source: any, base?: object) {
    if (typeof source !== "object" || !source) return source;
    let blank = {};
}
