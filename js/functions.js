// Функция для проверки длины строки.

const checkStringLength = function (string, testedLength) {
  return string.length === testedLength;
};

checkStringLength('Академия', 8); // true
checkStringLength('Полезные материалы', 18); // true
checkStringLength('Полезные материалы', 9); // false


// Функция для проверки, является ли строка палиндромом.

const isPalindrome = function (string) {
  let testedString = '';
  for (let i = 0; i < string.length; i++) {
    if (string[i] !== ' ') {
      testedString += string[i].toLowerCase();
    }
  }
  const lastIndex = testedString.length - 1;
  for (let i = 0; i < Math.round(testedString.length) / 2; i++) {
    if (testedString[i] !== testedString[lastIndex - i]) {
      return false;
    }
    return true;
  }
};

isPalindrome('Топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true

// Функция, извлекающая цифры из строки

const extractNumbers = function (string) {
  const numberToString = String(string);
  return (typeof string === 'string') ? parseInt(string.replace(/\D/g, ''), 10) : parseInt(numberToString.replace(/\D/g, ''), 10);
};

extractNumbers('ECMAScript 2022'); // 2022
extractNumbers('1 кефир, 0.5 батона'); // 105
extractNumbers('а я томат'); // NaN
extractNumbers('2023 год'); // 2023
extractNumbers(-1); // 1
extractNumbers(2023); // 2023
extractNumbers(1.5); // 15


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

addCharsToBeginString('1', 2, '0');
addCharsToBeginString('1', 4, '0');
addCharsToBeginString('q', 4, 'werty');
addCharsToBeginString('q', 4, 'we');
addCharsToBeginString('qwerty', 4, '0');
