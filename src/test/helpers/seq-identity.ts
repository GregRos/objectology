export function seqEqual<T>(result: T[], expected: T[]) {
    if (!result || !expected) return result === expected;
    if (result.length !== expected.length) return false;

    for (let i = 0; i < result.length; i++) {
        if (result[i] !== expected[i]) return false;
    }
    return true;
}

export function stripPrototype(o: any) {
    Object.setPrototypeOf(o, null);
    return o;
}