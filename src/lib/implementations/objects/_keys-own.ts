import {TargetObject} from "../../abstract";

export function _keysOwn(target: TargetObject) {
    let strKeys = Object.getOwnPropertyNames(target) as PropertyKey[];
    strKeys.push(...Object.getOwnPropertySymbols(target));
    return strKeys;
}
