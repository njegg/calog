const SPACE: number = 32;
const TO_LOWERCASE: number = 32;

export function fuzzyMatch(term: string, str: string): boolean {
  let termLen = term.length;
  if (termLen == 0) return true;

  let termHead = term.charCodeAt(0) | TO_LOWERCASE;

  let isFirstLetterMatchingAnyWord = false;
  let cIsFirstLetter = true;
  let c: number;
  for (let i = 0; i < str.length; i++) {
    c = str.charCodeAt(i) | TO_LOWERCASE;
    
    if (c == SPACE) {
      cIsFirstLetter = true
    } else if (cIsFirstLetter) {
      if (termHead == c) {
        isFirstLetterMatchingAnyWord = true
        break;
      };

      cIsFirstLetter = false;
    }
  }

  if (!isFirstLetterMatchingAnyWord) return false;

  let termIndex = 0;
  let strIndex = 0;

  while (termIndex < termLen && strIndex < str.length) {
    let tchar: number = term.charCodeAt(termIndex) | TO_LOWERCASE;
    let schar: number = str.charCodeAt(strIndex) | TO_LOWERCASE;

    if (tchar == schar) {
      termIndex++;
    }

    strIndex++;
  }

  return termIndex == termLen;
}

