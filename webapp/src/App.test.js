function calculateResult(guess, answer) {
  const guessFreq = guess.reduce((acc, e) => {
    if(acc[e] === undefined) {
      acc[e] = 1
    } else {
      ++acc[e]
    }
    return acc;
  }, {});

  const answerFreq = answer.split('').reduce((acc, e) => {
    if(acc[e] === undefined) {
      acc[e] = 1
    } else {
      ++acc[e]
    } 
    return acc;
  }, {});

  const frequencyEnumerated = guess.reduce((acc, curr) => {
    acc[curr] = 0
    return acc;
  }, {});
  
  let resultLetters = guess.map((e,i) => {
    let restOfAnswer = answer.substring(0, i) + answer.substring(i + 1);
    let returnLetter = '';

    if (!answer.includes(e)) {
      returnLetter += 'e';
    } else if(e === answer[i]) {
      returnLetter += 'c';
    } else if(restOfAnswer.includes(e)) {
      if (guessFreq[e] - answerFreq[e] === frequencyEnumerated[e] && frequencyEnumerated[e] > 0) {
        returnLetter += 'e'
      } else {
        returnLetter += 'i'; 
      }
    }

    if (guessFreq[e] > 1) {
      frequencyEnumerated[e] += 1;
    }

    return returnLetter;
  });
  
  return resultLetters;
}

test('Correct guess: speed-speed', () => {
  const result = calculateResult('speed', 'speed');
  expect(result).eql(['ccccc']);
});

test('Excluded guess: speed-atoll', () => {
  const result = calculateResult('speed', 'atoll');
  expect(result).eql(['eeeee']);
});

test('Incorrect guess: speed-abide', () => {
  const result = calculateResult('speed', 'abide');
  expect(result).eql(['eeiei']);
});

test('Incorrect guess: speed-erase', () => {
  const result = calculateResult('speed', 'erase');
  expect(result).eql(['ieiie']);
});

test('Incorrect guess: speed-steal', () => {
  const result = calculateResult('speed', 'steal');
  expect(result).eql(['cecee']);
});

test('Incorrect guess: speed-crepe', () => {
  const result = calculateResult('speed', 'crepe');
  expect(result).eql(['eicie']);
});

test('Incorrect guess: speed-budge', () => {
  const result = calculateResult('speed', 'budge');
  expect(result).eql(['eeiei']);
});