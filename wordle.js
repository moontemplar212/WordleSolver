const prompt = require('prompt-sync')();
const axios = require('axios');


// Guess your answer
// Five letters separated by commas
const input = prompt("What is your initial guess? ");

// What is the result
// c: correct - included and in the right place
// i: included - included and not in the right place
// e: excluded - excluded and does not occur in the word
// Five letters separated by commas
const order = prompt("What is the initial result? ");

async function sortResult(answer, result) {
  const a = answer.split(',');
  const r = result.split(',');
  const res = a.map((e, i) => [e, r[i]]);
  return res;
};

const a = sortResult(input, order);

console.log(a);
