
export function fuzzyMatch(term: string, str: string) {
  let termLen = term.length;
  if (termLen == 0) return true;

  let termIndex = 0;
  let strIndex = 0;

  while (termIndex < termLen && strIndex < str.length) {
    let tchar: number = term.charCodeAt(termIndex);
    let schar: number = str.charCodeAt(strIndex);

    if (tchar == schar || tchar - schar == 32 || schar - tchar == 32) {
      termIndex++;
    }

    strIndex++;
  }

  return termIndex == termLen;
}
