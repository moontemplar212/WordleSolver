const prompt = require("prompt-sync")();
const _ = require('lodash');

// https://raw.githubusercontent.com/davideastmond/wordsolverAPI/master/data/dictionary.json
let dict = require("./dictionary.json").filter((e) => e.length === 5);

const args = process.argv.slice(2);

let turns = 1;

// unlimited turns set as sufficiently large || standard 6 turns
const maxTurns = args[0] === "u" ? 99999 : 7;

async function receiveInput(typeInput, promptInput) {
  const pInput = prompt(`${promptInput} `);
  if (pInput === "exit") {
    process.exit(0);
  }
  if(pInput.length !== 5) {
    throw `${typeInput} length must be equal to five`;
  }
  return pInput;
}

async function recursiveInput(type, prompt) {
  try {
    const value = await receiveInput(type, prompt);
    return value;
  } catch (error) {
    console.error(error);
    recursiveInput();
  }
}

async function recursiveWordleSolve() {
  if (turns === maxTurns) {
    console.log("You Lose!");
    return;
  }

  console.log(`Turn: ${turns}`);

  const input = await recursiveInput("Input", "What is your guess?");
  
  console.log(`\n ${input} \n`);

  const result = await recursiveInput("Result", "What is the result?");

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

async function filterDict(answer, result) {
  const answerLetters = String(answer).trim().split("");
  
  const resultLetters = String(result).trim().split("");

  const freq = answerLetters.reduce((acc, e) => (acc[e] = ++acc[e] || 1, acc), {})

  const res = _.zip(answerLetters, resultLetters, answerLetters.map((_, i) => i));
  console.log(res);
  
  for(let i = 0; i < res.length; i++) {
    const [ guessLetter, resultLetter, answerLetterIndex ] = res[i];
    if(resultLetter === "e") {
      // remove words containing guessLetter freq 1 or guessLetter in this place freq > 1
      dict = dict.filter(e => (freq[guessLetter] > 1) ? e[answerLetterIndex] !== guessLetter : e.search(guessLetter) < 0 );
    }
    if(resultLetter === "c") {
      // keep words current letter === guessed letter
      dict = dict.filter(e => e[answerLetterIndex] === guessLetter)
    }
    if(resultLetter === "i") {
      // keep words included letter appears in remainder of word
      dict = dict.filter(e => {
        const notIncludedLetters = e.replace(e[answerLetterIndex], '');
        if(notIncludedLetters.includes(guessLetter)) {
          return e;
        }
        return;       
      });
      // remove words included letter in this place
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
