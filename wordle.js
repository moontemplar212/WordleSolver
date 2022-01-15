const prompt = require('prompt-sync')();

// Only want the five letter words
let dict = require('./dictionary.json').filter(e => e.length === 5);

// Credit to https://raw.githubusercontent.com/davideastmond/wordsolverAPI/master/data/dictionary.json

async function recursiveWordleSolve() {
  input = await getInput();

  console.log(`\n ${input} \n`);

  decision = await getResult();

  console.log(`\n ${decision} \n`);

  await filterDict(input, decision);

  if(dict.length === 1) {
    console.log("You Won!");
  } else {
    recursiveWordleSolve();
  }
}

async function getInput() {
  // Guess your answer
  // Enter your word, five letters
  
  return input = prompt("What is your initial guess? ");
}

async function getResult() {
  // What is the result
  // c: correct - included and in the right place
  // i: included - included and not in the right place
  // e: excluded - excluded and does not occur in the word

  return order = prompt("What is the initial result? ");
}

async function filterDict(answer, result) {
  const a = String(answer).trim().split('');
  const r = String(result).trim().split('');

  console.log('A:', a);
  console.log('R:', r);

  r.forEach((v, i) => {
    if(v === 'c') {
      // This letter is correct
      dict = dict.filter(e => e[i] === a[i]);
    }

    if(v === 'e') {
      // This letter does not appear at all
      dict = dict.filter(e => e.search(a[i]) < 0); 
    }

    if(v === 'i') {
      // And this letter appears somewhere in the word 
      dict = dict.filter(e => e.search(a[i]) > 0);
    }
  });

  console.log(dict);
};

async function main() {
  recursiveWordleSolve();
}

main();
