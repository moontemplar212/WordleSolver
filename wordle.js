const prompt = require('prompt-sync')();

// Only want the five letter words
let dict = require('./dictionary.json').filter(e => e.length === 5);

// Credit to https://raw.githubusercontent.com/davideastmond/wordsolverAPI/master/data/dictionary.json

let turns = 1;  

async function recursiveWordleSolve() {

  if (turns === 7) {
    console.log("You Lose!");
    return;
  }

  // Print the rules

  console.log(
    /*
      WordleSolve.js

      Enter your 5 letter guess and the decision using:

      c - correct: included and in the right place

      i - included: included and not in the right place

      e - excluded: excluded and does not occurr in the word
  
      A list of remaining words will be printed to the screen.

      Take another guess until you win or lose. 
    */
  );

  console.log(`Turn: ${turns}`);

  input = await getInput();

  if(input === 'exit') {
    return;
  }

  console.log(`\n ${input} \n`);

  decision = await getResult();

  console.log(`\n ${decision} \n`);

  await filterDict(input, decision);

  if(dict.length === 1) {
    console.log("You Won!");
  } else {
    turns += 1;
    recursiveWordleSolve();
  }
}

async function getInput() {
  // Guess your answer
  // Enter your word, five letters
  
  return input = prompt("What is your guess? ");
}

async function getResult() {
  // What is the result
  // c: correct - included and in the right place
  // i: included - included and not in the right place
  // e: excluded - excluded and does not occur in the word

  return order = prompt("What is the result? ");
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
      console.log('FC:', dict)
    }

    if(v === 'e') {
      // This letter does not appear at all
      dict = dict.filter(e => e.search(a[i]) < 0);
      console.log('FE:', dict)
    }

    if(v === 'i') {
      // And this letter appears somewhere in the word but not in this spot
      dict = dict.filter(e => e.search(a[i]) > 0 && e[i] !== a[i]);
      console.log('FI:', dict)
    }
  });

  console.log(dict);
  console.log(dict.length);
};

async function main() {
  recursiveWordleSolve();
}

main();
