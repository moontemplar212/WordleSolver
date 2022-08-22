const prompt = require("prompt-sync")();
const _ = require('lodash');

//Credit to https://raw.githubusercontent.com/davideastmond/wordsolverAPI/master/data/dictionary.json
let dict = require("./dictionary.json").filter((e) => e.length === 5);

let turns = 0;

// unlimited turns set as sufficiently large || standard 6 turns
const maxTurns = process.argv.slice(2)[0] === "u" ? 99999 : 6;

async function receiveInput(typeInput, promptInput) {
  const pInput = prompt(`${promptInput} `);
  if (pInput === "exit") {
    process.exit(0);
  }
  if(pInput.length !== 5) {
    throw new Error(`${typeInput} length must be equal to five`);
  }
  return pInput;
}

async function recursiveInput(type, prompt) {
  let value;
  try {
    value = await receiveInput(type, prompt);
  } catch (error) {
    recursiveInput(type, prompt);
  }
  return value;
}

async function recursiveWordleSolve() {
  turns += 1;

  if (turns > maxTurns) {
    console.log("You lose!");
    return;
  }

  console.log(`Turn: ${turns}`);

  const input = await recursiveInput("Input", "What is your guess?");
  
  console.log(`\n ${input} \n`);

  const result = await recursiveInput("Result", "What is the result?");

  console.log(`\n ${result} \n`);

  await filterDict(input, result);

  if (dict.length === 1) {
    console.log("You won!");

    console.log(`You took ${turns} turns.`);

    process.exit(0);
  } else {
    recursiveWordleSolve();
  }
}

async function filterDict(answer, result) {
  const answerLetters = String(answer).trim().split("");
  
  const resultLetters = String(result).trim().split("");

  const freq = answerLetters.reduce((acc, e) => (acc[e] = ++acc[e] || 1, acc), {})

  const res = _.zip(answerLetters, resultLetters, answerLetters.map((_, i) => i));
  
  for(let i = 0; i < res.length; i++) {
    const [ guessLetter, resultLetter, answerLetterIndex ] = res[i];
    if(resultLetter === "e") {
      // remove words containing guessLetter freq 1 or guessLetter in this place freq > 1
      dict = dict.filter(e => (freq[guessLetter] > 1) ? e[answerLetterIndex] !== guessLetter : e.search(guessLetter) < 0 );
    }
    if(resultLetter === "c") {
      // keep words current letter === guessed letter
      dict = dict.filter(e => e[answerLetterIndex] === guessLetter)
      // remove words current letter !== guessed letter
      dict.forEach((word) => {
        if(word[answerLetterIndex] !== guessLetter) {
          dict.splice(word);
        }
      });
    }
    if(resultLetter === "i") {
      // keep words included letter appears in remainder of word
      dict = dict.filter(e => e.replace(e[answerLetterIndex], '').includes(guessLetter) && e);
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

// main();

function second() {
  const wordleDict = dict.slice(0, 2315);

  const wordleMap = Array(wordleDict.length * wordleDict.length);

  // Want to work out the possible patterns from each starting word to each endingWord
  // This relies upon previous guesses. Hard.

  // States ( Correct: G, Included: Y, Excluded: B);
  const S = 3

  // Word length
  const N = 5;

  // Number of guesses
  const G = 6;

  let permutations = {};

  const loopI = 1;
  const loopJ = 2315*1;

  // starting word
  for(let i = 0; i < loopI; i++) {
    console.log(`SW`, wordleDict[i]);
    // ending word
    for(let j = 0; j < loopJ; j++) {
      console.log(`EW`, wordleDict[j]);
      let colourR = 0;
      let colourG = 0;
      let colourB = 0;

      const colourValue = wordleDict[j].split('').reduce((acc, cur, index) => {
        if(wordleDict[i][index] === cur) {
          colourR += 0
          colourG += 255
          colourB += 0
        } else if(wordleDict[i].replace(wordleDict[i][index], '').includes(cur)) {
          colourR += 255
          colourG += 255
          colourB += 0
        } else if (!wordleDict[i].includes(cur)) {
          colourR += 0
          colourG += 0
          colourB += 0
        }
        acc = [ colourR, colourG, colourB ];
        return acc;
      }, []);
      const averageColourValue = colourValue.map(e => e/N);
      wordleMap[i*loopJ+j] = averageColourValue;
    }
  }

  console.log(wordleMap.slice(0, loopI*loopJ));

  // for (let i = 0; i < G+1; i++) {
  //   permutations[i] = Math.pow((Math.pow(S, N) - (N + 1)), i);
  // }

  // const outcomes = Object.values(permutations).reduce((acc, cur) => {
  //   return acc += cur
  // }, 0);

  // console.log(outcomes);

}

second();


// 2D -> 1D
/**
 * 
 * for (int i=0; i < n; i++)
 { for (int j =0; j< m; j++)
 b[i*m+j] = a[i][j];
 } 
 * 
 i= k/m; //rounding down
 j = k -(i*m); 


 https://www.ce.jhu.edu/dalrymple/classes/602/Class12.pdf
 */