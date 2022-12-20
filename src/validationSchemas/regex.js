const latin = /^[A-z\u00C0-\u00ff\s',-/#!$%^&*;:{}=\-_`~()]+$/;

const latinWithNumbers = /^[A-z0-9\u00C0-\u00ff\s',-/#!$%^&*;:{}=\-_`~()]+$/;

const fullName = /^[a-zA-Z][a-zA-Z .,'-]*$/;

const password = /^[a-zA-Z0-9\-_]{0,40}$/;

const noSpaces = /^\S*$/;

const noEndlessSpaces = /^((?!\s{2}).)*$/;

const username = /^[a-zA-Z0-9._]+$/;

const limitWords = /^\W*(\w+(\W+|$)){2,3}$/;

const atLeastOneNumber = /.*[0-9].*/;

export {
  latin,
  latinWithNumbers,
  fullName,
  password,
  noSpaces,
  limitWords,
  username,
  noEndlessSpaces,
  atLeastOneNumber,
};
