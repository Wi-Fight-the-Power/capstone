// export const nouns = ['airplane', 'bowl', 'spoon', 'cup', 'house', 'book', 'plant', 'window', 'desk', 'soda'];

const nouns = require('noun-json');

export const randomWord = () => {
  let index = Math.floor(Math.random() * nouns.length);
  return nouns[index];
}

