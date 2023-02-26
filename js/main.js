const NAMES = [
  'Андрей',
  'Анна',
  'Виктор',
  'Георгий',
  'Дмитрий',
  'Елена',
  'Евгения',
  'Кристина',
  'Леонид',
  'Николай'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Зона для купания',
  'Указатель на пляж',
  'Песчаный пляж',
  'Девушка в купальнике',
  'Азиатский суп',
  'Черный спортивный автомобиль',
  'Клубника в разрезе',
  'Ягодный морс',
  'Кукурузник в небе',
  'Полка для обуви',
  'Вход на пляж',
  'Автомобиль белый марки "Ауди"',
  'Летний салат',
  'Кот на суши',
  'Ултрамодные сапоги',
  'Вид сверху на горы',
  'Выступление хора на сцене',
  'Ретро автомобиль красного цвета',
  'Тапочки с подсветкой',
  'Территория отеля',
  'Блюдо из риса и курицы',
  'Закат на пляже',
  'Краб',
  'Концерт рок-звезды',
  'Путешествие на машине'
];

const PHOTO_COUNT = 25;

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

// Поиск рандомного элемента из массива

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Генерация id и url для фото и комментария

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoUrl = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 100);

// Создание комментария

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Создание произвольного числа комментариев

const createRandomCountComments = () => {
  const comments = Array.from({length: getRandomInteger(1, 3)}, createComment);
  return comments;
};

// Создание фото с комментариями

const createPhoto = () => {
  const photoUrl = generatePhotoUrl();

  return {
    id: generatePhotoId(),
    url: `photos/${photoUrl}.jpg`,
    description: DESCRIPTIONS[photoUrl - 1],
    likes: getRandomInteger(15, 200),
    comments: createRandomCountComments(),
  };
};

// Создание галереи фото

const photoGallery = Array.from({length: PHOTO_COUNT}, createPhoto);

// eslint-disable-next-line no-console
console.log(photoGallery);
