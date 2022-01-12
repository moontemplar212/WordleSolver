const prompt = require('prompt-sync')();
const axios = require('axios');

async function recursiveWordleSolve(input = 0, decision = 0) {
  input = await getInput();

  console.log(input);

  decision = await getResult();

  console.log(decision);

  const [ sortedInput, sortedDecision ] = await sortResult(input, decision);

  recursiveWordleSolve(sortedInput, sortedDecision);
}

async function getInput() {
  // Guess your answer
  // Enter your word, five letters
  
  const input = prompt("What is your initial guess? ");
  return input;
}

async function getResult() {
  // What is the result
  // c: correct - included and in the right place
  // i: included - included and not in the right place
  // e: excluded - excluded and does not occur in the word

  const order = prompt("What is the initial result? ");
  return order;
}

async function sortResult(answer, result) {
  const a = answer.trim().split('');
  const r = result.trim().split('');
  const res = a.map((e, i) => [e, r[i]]);

  console.log(res);

  let exclude = [];
  let letters = [];

  res.forEach(([l, d]) => {
    if(d === 'e') {
      exclude.push(l);
    } else {
      letters.push(l);
    }
  });

  exclude = [...new Set(exclude)];
  letters = [...new Set(letters)];

  // unique chars
  exclude = exclude.join('');
  letters = letters.join('');
  
  // axios request from dword to find those words that are valid given sortedResult

  const wordList = await getWordList(exclude, letters);

  console.log(wordList);

  return [ res, wordList];
};

async function getWordList(excludedLetters, letters) {
  axios({
    method: 'post',
    url: 'https://www.dcode.fr/api/',
    data: {
      tool: 'words-containing',
      letters: letters,
      method: 'letters_order',
      dico: 'DICO_EN',
      number_of_letters: '5',
      exclude_letters: excludedLetters
    }
  }).then((response) => {
    console.log('R:', response);
    const wordList = response.results;
    console.log(wordList);
    return wordList;
  });
}

async function main() {
  // recursiveWordleSolve();
  // const body = 'tool=words-containing&letters=st&method=letters_order&dico=DICO_EN&number_of_letters=5&exclude_letters=ar';
  // const response = await axios.post('https://www.dcode.fr/api/', body, {
  //   headers: {
  //     'authority': 'www.dcode.fr',
  //     'method': 'POST',
  //     'path': '/api/',
  //     'scheme': 'https',
  //     'accept': 'application/json, text/javascript, */*; q=0.01',
  //     'accept-encoding': 'gzip, deflate, br',
  //     'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  //     'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //     'origin': 'https://www.dcode.fr',
  //     'referer': 'https://www.dcode.fr/words-containing',
  //     'sec-fetch-dest': 'empty',
  //     'sec-fetch-mode': 'cors',
  //     'sec-fetch-site': 'same-origin',
  //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
  //     'x-requested-with': 'XMLHttpRequest'
  //   }
  // });
  console.log(response);
}

main();
