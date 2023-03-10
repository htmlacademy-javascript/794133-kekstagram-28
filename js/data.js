import {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElements} from './util.js';

const PHOTO_COUNT = 25;
const PHOTO_ID_START = 1;
const PHOTO_ID_END = 25;
const COMMENT_ID_START = 1;
const COMMENT_ID_END = 100;
const LIKE_COUNT_MIN = 15;
const LIKE_COUNT_MAX = 200;
const COMMENT_COUNT_MIN = 0;
const COMMENT_COUNT_MAX = 5;

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

// Генерация id для фото и комментария

const generatePhotoId = createRandomIdFromRangeGenerator(PHOTO_ID_START, PHOTO_ID_END);
const generateCommentId = createRandomIdFromRangeGenerator(COMMENT_ID_START, COMMENT_ID_END);

// Создание комментария

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElements(MESSAGES, getRandomInteger(1, 2)),
  name: getRandomArrayElements(NAMES, 1),
});

// Создание произвольного числа комментариев

const createRandomCountComments = () => Array.from({length: getRandomInteger(COMMENT_COUNT_MIN, COMMENT_COUNT_MAX)}, createComment);

// Создание фото с комментариями

const createPhoto = () => {
  const photoId = generatePhotoId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: DESCRIPTIONS[photoId - 1],
    likes: getRandomInteger(LIKE_COUNT_MIN, LIKE_COUNT_MAX),
    comments: createRandomCountComments(),
  };
};

// Создание галереи фото

const createPhotoGallery = () => Array.from({length: PHOTO_COUNT}, createPhoto);

export {createPhotoGallery};
