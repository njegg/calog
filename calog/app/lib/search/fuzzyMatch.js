export function fuzzyMatch(term, str) {
    let termLen = term.length;
    if (termLen == 0)
        return true;
    let termIndex = 0;
    let strIndex = 0;
    while (termIndex < termLen && strIndex < str.length) {
        let tchar = term.charCodeAt(termIndex);
        let schar = str.charCodeAt(strIndex);
        if (tchar == schar || tchar - schar == 32 || schar - tchar == 32) {
            termIndex++;
        }
        strIndex++;
    }
    return termIndex == termLen;
}
//# sourceMappingURL=fuzzyMatch.js.map