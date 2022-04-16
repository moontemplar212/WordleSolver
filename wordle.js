const prompt = require("prompt-sync")();
const _ = require('lodash');

// Only want the five letter words
let dict = require("./dictionary.json").filter((e) => e.length === 5);

// Credit to https://raw.githubusercontent.com/davideastmond/wordsolverAPI/master/data/dictionary.json

const args = process.argv.slice(2);

let turns = 1;
const maxTurns = args[0] === "u" ? 99999 : 7;

async function recursiveWordleSolve() {
  if (turns === maxTurns) {
    console.log("You Lose!");
    return;
  }

  console.log(`Turn: ${turns}`);

  input = await getInput();

  if (input === "exit") {
    return;
  }

  console.log(`\n ${input} \n`);

  decision = await getResult();

  if (decision === "exit") {
    return;
  }

  console.log(`\n ${decision} \n`);

  await filterDict(input, decision);

  if (dict.length === 1) {
    console.log("You Won!");
  } else {
    turns += 1;
    recursiveWordleSolve();
  }
}

async function getInput() {
  // Guess your answer
  // Enter your word, five letters
  return (input = prompt("What is your guess? "));
}

async function getResult() {
  // What is the result
  return (order = prompt("What is the result? "));
}

function setCharAt(str,index,chr) {
  return str.substring(0,index) + chr + str.substring(index+1);
}


async function filterDict(answer, result) {
  const answerLetters = String(answer).trim().split("");
  const resultLetters = String(result).trim().split("");

  const lenCorrectIncluded = resultLetters.filter(e => e !== "e" && e !== "i").length;

  const res = _.zip(answerLetters, resultLetters, answerLetters.map((_, i) => i));
  console.log(res);
  
  const includedIndices = resultLetters.map((e, i) => {
    if(e == "i") {
      return i;
    }
    return;
  }).filter(Number.isFinite);

  for(let i = 0; i < res.length; i++) {
    const [ guessLetter, resultLetter, answerLetterIndex ] = res[i];
    if(resultLetter === "e") {
      dict = dict.filter(e => e.search(guessLetter) < 0);
    }
    if(resultLetter === "c") {
      dict = dict.filter(e => e.indexOf(guessLetter) === answerLetterIndex && e[e.indexOf(guessLetter)] === guessLetter)
    }
    if(resultLetter === "i") {
      dict = dict.filter(e => {
        const notIncludedLetters = e.split('').map(p => !includedIndices.includes(e.split('').indexOf(p)) && p).filter(e => e);
        if(notIncludedLetters.includes(guessLetter)) {
          return e;
        }
        return;       
      });
    }
  }

  console.log(`Dict: ${dict}`);
  console.log(`Dict len: ${dict.length}`);

  // dict = dict.reduce((arr, c, j) => {
  //   let wordHolder = [];
    
  //   const notIncludedLetters = c.split("").map(e => !includedIndices.includes(c.split('').indexOf(e)) && e).filter(e => e);

  //   for(let i = 0; i < res.length; i++) {
  //     const [ guessLetter, resultLetter, answerLetterIndex ] = res[i];
  //     if(resultLetter === "e") {
  //       console.log(`here 1`);
  //       arr = arr.filter(e => !e.search(guessLetter) > 0);
  //     }
  //     if(resultLetter === "i") {
  //       if(notIncludedLetters.includes(guessLetter)) {
  //         console.log(`here 2`);
  //         continue;
  //       } else {
  //         console.log(`here 3`);
  //         arr.splice(j);
  //       }        
  //     }
  //     if(resultLetter === "c" && c[answerLetterIndex] === guessLetter) {
  //       console.log(`here 4`);
  //       wordHolder.push(1);
  //     }
  //   }
  //   if(wordHolder.length != lenCorrectIncluded) {
  //     console.log(`here 5`);
  //     arr.splice(j);
  //   }
  //   return arr;
  // }, dict);

  // console.log(`Dict: ${dict}`);
  // console.log(`Dict len: ${dict.length}`);
}

async function main() {
  // Print the rules
  console
    .log(
    `
      WordleSolve.js

      Enter your 5 letter guess and the decision using:

      c - correct: included and in the right place

      i - included: included and not in the right place

      e - excluded: excluded and does not occurr in the remainder of the word ( a double letter occurance shows as i while one of the two if incorrect is e )
  
      A list of remaining words will be printed to the screen.

      Take another guess until you win or lose. 
    `
    );
  recursiveWordleSolve();
}

main();
