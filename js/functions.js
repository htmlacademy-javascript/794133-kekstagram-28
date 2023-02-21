// Функция для проверки длины строки.

const checkStringLength = (string, testedLength) => string.length === testedLength;

checkStringLength('Полезные материалы', 18); // true
checkStringLength('Полезные материалы', 9); // false

// Функция для проверки, является ли строка палиндромом.

const isPalindrome = (string) => {
  const convertedString = string.toLowerCase().replaceAll(' ', '');
  const lastIndex = convertedString.length - 1;
  for (let i = 0; i < Math.round(convertedString.length) / 2; i++) {
    if (convertedString[i] !== convertedString[lastIndex - i]) {
      return false;
    }
    return true;
  }
};

isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true

// Функция, извлекающая цифры из строки

const extractNumber = (string) => {
  const numberToString = String(string);
  return (typeof string === 'string') ? parseInt(string.replace(/\D/g, ''), 10) : parseInt(numberToString.replace(/\D/g, ''), 10);
};

extractNumber('ECMAScript 2022'); // 2022
extractNumber('а я томат'); // NaN
extractNumber(-1); // 1


// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины.

const addCharsToBeginString = (inputString, minLength, charsString) => {
  if (inputString.length >= minLength) {
    return inputString;
  }
  const numCharsToAdd = minLength - inputString.length;
  let leadingChars = '';
  while (leadingChars.length < numCharsToAdd) {
    leadingChars = charsString.slice(0, numCharsToAdd - leadingChars.length) + leadingChars;
  }
  return leadingChars + inputString;
};

addCharsToBeginString('1', 2, '0'); // '01'
addCharsToBeginString('q', 4, 'we'); // 'wweq'
addCharsToBeginString('qwerty', 4, '0'); // 'qwerty'
