// If letter is included, then words must not contain that letter in that place

const prompt = require("prompt-sync")();
const _ = require('lodash');

// https://raw.githubusercontent.com/davideastmond/wordsolverAPI/master/data/dictionary.json
let dict = require("./dictionary.json").filter((e) => e.length === 5);

const args = process.argv.slice(2);

let input;
let result;

let turns = 1;

// unlimited turns set as sufficiently large || standard 6 turns
const maxTurns = args[0] === "u" ? 99999 : 7;

async function recursiveInput() {
  try {
    input = await getInput();
  } catch (error) {
    console.error(error);
    recursiveInput();
  }
}

async function rescursiveResult() {
  try {
    result = await getResult();
  } catch (error) {
    console.error(error);
    rescursiveResult();
  }
}

async function recursiveWordleSolve() {
  if (turns === maxTurns) {
    console.log("You Lose!");
    return;
  }

  console.log(`Turn: ${turns}`);

  await recursiveInput();
  
  console.log(`\n ${input} \n`);

  await rescursiveResult();

  console.log(`\n ${result} \n`);

  await filterDict(input, result);

  if (dict.length === 1) {
    console.log("You Won!");
    process.exit(0);
  } else {
    turns += 1;
    recursiveWordleSolve();
  }
}

async function getInput() {
  // Guess your answer
  const input = prompt("What is your guess? ");
  if (input === "exit") {
    process.exit(0);
  }
  if(input.length !== 5) {
    throw 'Input length must be equal to five';
  }
  return input;
}

async function getResult() {
  // What is the result
  const result = prompt("What is the result? ");
  if (result === "exit") {
    process.exit(0);
  }
  if(result.length !== 5) {
    throw 'Result length must be equal to five';
  }
  return result;
}


async function filterDict(answer, result) {
  const answerLetters = String(answer).trim().split("");
  
  const resultLetters = String(result).trim().split("");

  const freq = answerLetters.reduce((acc, e) => (acc[e] = ++acc[e] || 1, acc), {})

  const res = _.zip(answerLetters, resultLetters, answerLetters.map((_, i) => i));
  console.log(res);
  
  for(let i = 0; i < res.length; i++) {
    const [ guessLetter, resultLetter, answerLetterIndex ] = res[i];
    if(resultLetter === "e") {
      // remove words which contain the guessLetter at that particular place and if freq 1 then whole words
      dict = dict.filter(e => (freq[guessLetter] > 1) ? e[answerLetterIndex] !== guessLetter : e.search(guessLetter) < 0 );
    }
    if(resultLetter === "c") {
      // keep words where the current letter == your guessed letter
      dict = dict.filter(e => e[answerLetterIndex] === guessLetter)
    }
    if(resultLetter === "i") {
      // keep words where the included letter appears in the remainder of the word
      dict = dict.filter(e => {
        const notIncludedLetters = e.replace(e[answerLetterIndex], '');
        if(notIncludedLetters.includes(guessLetter)) {
          return e;
        }
        return;       
      });
      // remove words where the included letter is in this place
      dict = dict.filter(e => e[answerLetterIndex] !== guessLetter);
    }
  }

  console.log(`Dict: ${dict}`);
  
  console.log(`Dict len: ${dict.length}`);
}

async function main() {
  console
    .log(
    `
      WordleSolve.js

      Enter your 5 letter guess and the result using:

      c - correct: included and in the right place

      i - included: included and not in the right place

      e - excluded: excluded and does not occurr in the remainder of the word ( a double letter occurance shows as i while one of the two if incorrect is e )
  
      A list of remaining words will be printed to the screen.

      Take another guess until you win or lose.

      Use 'exit' to quit.
    `
    );
  recursiveWordleSolve();
}

main();
