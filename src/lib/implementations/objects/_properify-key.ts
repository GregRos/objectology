export function _properifyKey(x: any): string | number {
    if (typeof x !== "string") return x;
    // this converts valid array indexes into numeric form
    let numerified = +x;
    if (!Number.isSafeInteger(numerified) && numerified >= 0) return x;
    return ("" + numerified) === x ? +x : x;
}
