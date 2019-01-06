import {TargetObject} from "../abstract";

export function _keysOwn(target: TargetObject) {
    if (target == null) return [];
    let strKeys = Object.getOwnPropertyNames(target) as PropertyKey[];
    strKeys.push(...Object.getOwnPropertySymbols(target));
    return strKeys;
}
