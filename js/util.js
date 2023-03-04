// Поиск рандомного числа

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Создание уникального идентификатора

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// Получение случайных элементов массива

const getRandomArrayElements = (array, numberOfElements) => {
  if (array.length === 0 || numberOfElements > array.length) {
    return [];
  }
  array.sort(() => Math.random() - 0.5);
  return array.slice(0, numberOfElements).join(' ');
};

export {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElements};
