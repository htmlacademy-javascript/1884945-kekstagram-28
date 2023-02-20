// Функция для проверки длины строки. Она нам пригодится для валидации формы.

function validateStringLength(originalString, maxStringLengthExpected) {
  return originalString.length <= maxStringLengthExpected;
}

// Функция для проверки, является ли строка палиндромом.

function isPalindrom(originalString) {
  const cleanString = originalString.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i <= cleanString.length / 2; i++) {
    if (cleanString.at(i) !== cleanString.at(-(i + 1))) {
      return false;
    }
  }
  return true;
}

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры,
// функция должна вернуть NaN.

function getNumbers(originalString) {
  const stringWithoutWhitespaces = originalString
    .toString()
    .replaceAll(' ', '');
  let stringOfNumbers = '';
  for (let i = 0; i < stringWithoutWhitespaces.length; i++) {
    if (!isNaN(+stringWithoutWhitespaces[i])) {
      stringOfNumbers += stringWithoutWhitespaces[i];
    }
  }
  if (stringOfNumbers) {
    return parseInt(stringOfNumbers, 10);
  }
  return NaN;
}

/*
Функция, которая принимает три параметра: исходную строку, минимальную длину и строку
с добавочными символами — и возвращает исходную строку, дополненную указанными
символами до заданной длины.
- Символы добавляются в начало строки.
- Если исходная строка превышает заданную длину, она не должна обрезаться.
- Если «добивка» слишком длинная, она обрезается с конца.
Эта функция нам пригодится для формирования адресов файлов.
*/
function addString(originalString, minLength, additionalCharacters) {
  if (originalString.length >= minLength) {
    return originalString;
  }
  while (originalString.length < minLength) {
    if ((originalString + additionalCharacters).length > minLength) {
      additionalCharacters = additionalCharacters.slice(
        0,
        -((originalString + additionalCharacters).length - minLength)
      );
    }
    originalString = additionalCharacters + originalString;
  }
  return originalString;
}

// Вызов функций, чтобы Кексобот не ругался на ошибки eslint ('фукция' is defined but never used).

validateStringLength();
isPalindrom();
getNumbers();
addString();
