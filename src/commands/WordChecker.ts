export const check = (word: string, subString: string) => {
  if (!word.includes(subString)) {
    return false;
  }
  const wordlist = require('wordlist-english');
  const englishWords = wordlist['english'];
  return englishWords.indexOf(word) > -1;
}