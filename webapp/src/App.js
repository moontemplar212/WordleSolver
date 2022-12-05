import './App.css';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TextInput } from './components/inputs/textInput/TextWithLabelInputComponent';
import { TextDisplay } from './components/displays/textDisplay/TextWithLabelDisplayComponent';
import { GridDisplay } from './components/displays/gridDisplay/GridDisplayComponent';
const _ = require('lodash');

let dict = require("./dictionaryFive.json");

const answer = dict[Math.floor(Math.random() * (dict.length - 0 + 1) + 0)];


const answerFreq = answer.split('').reduce((acc, e) => {
  if(acc[e] === undefined) {
    acc[e] = 1
  } else {
    ++acc[e]
  } 
  return acc;
}, {});

const letterList = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'].map(e => e.toLowerCase());

const Render = () => {
  let [ lengthValue, setLengthValue ] = useState(5);
  let [ statesValue, setStatesValue ] = useState(3);
  let [ rowsValue, setRowsValue ] = useState(6);
  let [ winning ] = useState(1);
  let [ possibleValue, setPossibleValue ] = useState(Math.pow(statesValue, lengthValue * rowsValue));
  let [ incorrectValue, setIncorrectValue ] = useState(Math.pow(Math.pow(statesValue, lengthValue) - (lengthValue + 1), rowsValue));
  let [ guessesValue, setGuessesValue ] = useState(incorrectValue + winning);
  let [ disallowedValue, setDisallowedValue ] = useState(possibleValue - guessesValue);
  let [ displayTextArray, setDisplayTextArray ] = useState([]);
  let [ allowableWords, setAllowableWordsLength ] = useState(1);
  let [ enterPressed, setEnterPressed ] = useState(0);
  let [ guess, setGuess ] = useState([]);
  let [ dictLength, setDictLength ] = useState(dict.length);
  let [ result, setResult ] = useState([]);
  
  let renderCount = useRef(0);
  let colRefs = useRef([]);
  let keyRefs = useRef([]);
  const appRef = useRef(null);

  const updateDisplayText = (newValue) => {
    if(displayTextArray.includes(undefined)) {
      displayTextArray[displayTextArray.indexOf(undefined)] = newValue
    } else {
      displayTextArray.push(newValue)
    } 
    setDisplayTextArray([...displayTextArray]);
  }

  const removeDisplayText = () => {
    displayTextArray.pop()
    setDisplayTextArray([...displayTextArray]);
  }

  // Every render
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  // on initial App mount
  useEffect(() => {
    Array.from(new Array(letterList.length)).map((_, i) => keyRefs.current[i] = React.createRef());
    appRef.current.focus();
  }, []);

  // on change lV, rV
  useEffect(() => {
    Array.from(new Array(lengthValue * rowsValue)).map((_, i) => colRefs.current[i] = React.createRef());
  }, [lengthValue, rowsValue]);

  useEffect(() => {
    if (colRefs) {
      let resultLetters = calculateResult(guess);
      setResult(resultLetters);
      const colours = colourValues(resultLetters);
      for (let i = 0; i < colours.length; i++) {
        // This is shitty, allowableWords updates before this happens even though setGuess is called first
        // Bug in useEffect, useRef implementation of my code, too hard for me right now 😭
        colRefs.current[i + (lengthValue * (allowableWords - 2))].current.style.backgroundColor = colours[i];
      }
      let remainingWords = calculateRemaining(guess, resultLetters);
      setDictLength(remainingWords.length);
    }
  }, [guess, setResult, setDictLength, lengthValue, allowableWords]);

  const gridDisplayChild = (lengthValue, rowsValue, letters) => {
    let rows = [];
    let cols = [];

    for (let j = 0; j < lengthValue * rowsValue; j++) {
      let col = React.createElement('div', { key: `col_${j}`, className: 'grid_col', children: letters[j], ref: colRefs.current[j], style: { backgroundColor: "#FFFFFF" } });
      cols.push(col);
    }

    for (let i = 0; i < rowsValue; i++) {
      let row = React.createElement('div', { key: `row_${i}`, className: 'grid_row'}, cols.slice(i*lengthValue, (i+1)*(lengthValue)));
      rows.push(row);
    }
    
    return rows;
  }

  let keyRow1 = () => {
    let keys1 = [];

    for (let k = 0; k < 10; k++) {
      let key = React.createElement('div', { id: `key_${k}`, key: `key_${k}`, className: 'key', children: letterList[k], ref: keyRefs.current[k], onClick: OnHandler});
      keys1.push(key);
    }

    return React.createElement('div', { id: `keyRow1`, key: `keyRow1`, className: 'keyboard_row_1'}, keys1);
  }

  let keyRow2 = () => {
    let keys2 = [];
    const offset = 10;

    for (let k = 0; k < 9; k++) {
      let key = React.createElement('div', { id: `key_${k + offset}`, key: `key_${k + offset}`, className: 'key', children: letterList[k + offset], ref: keyRefs.current[k + offset], onClick: OnHandler});
      keys2.push(key);
    }

    return React.createElement('div', { id: `keyRow2`, key: `keyRow2`, className: 'keyboard_row_2'}, keys2);
  }

  let keyRow3 = () => {
    let keys3 = [];
    const offset = 19;

    const enterRef = React.createElement('div', { id: `key_enter`, key: `key_26`, className: 'key', children: '⎵', ref: keyRefs.current[19], onClick: OnHandler});

    keys3.push(enterRef);

    for (let k = 0; k < 7; k++) {
      let key = React.createElement('div', { id: `key_${k + offset}`, key: `key_${k + offset}`, className: 'key', children: letterList[k + offset], ref: keyRefs.current[k + offset], onClick: OnHandler});
      keys3.push(key);
    }
    
    const backspaceRef = React.createElement('div', { id: `key_backspace`, key: `key_27`, className: 'key', children: '⮽', ref: keyRefs.current[27], onClick: OnHandler});

    keys3.push(backspaceRef);

    return React.createElement('div', { id: `keyRow3`, key: `keyRow3`, className: 'keyboard_row_3'}, keys3);
  }

  const lengthInput = <TextInput name="length" length="1" value={lengthValue} onChange={e => setLengthValue(e.target.value.replace(/[^1-9]/g, ''))}></TextInput>;

  const rowsInput = <TextInput name="rows" length="1" value={rowsValue} onChange={e => setRowsValue(e.target.value.replace(/[^1-9]/g, ''))}></TextInput>;

  const statesInput = <TextInput name="states" length="1" value={statesValue} onChange={e => setStatesValue(e.target.value.replace(/[^1-9]/g, ''))}></TextInput>;

  const possibleDisplay = <TextDisplay name="possible" value={possibleValue}></TextDisplay>

  const guessesDisplay = <TextDisplay name="guesses" value={guessesValue}></TextDisplay>

  const incorrectDisplay = <TextDisplay name="incorrect" value={incorrectValue}></TextDisplay>

  const disallowedDisplay = <TextDisplay name="disallowed" value={disallowedValue}></TextDisplay>
  
  // useEffect(() => {
  //   return () => {
  //     setPossibleValue(Math.pow(statesValue, lengthValue * rowsValue));
  //     setGuessesValue(incorrectValue + winning);
  //     setIncorrectValue(Math.pow(Math.pow(statesValue, lengthValue) - (lengthValue + 1), rowsValue));
  //     setDisallowedValue(possibleValue - guessesValue);
  //   }
  // }, [lengthValue, rowsValue, statesValue, incorrectValue, winning, possibleValue, guessesValue]);

  function colourValues(resultLetters) {
    const colourMap = {
      'c': '#00FF00',
      'e': '#808080',
      'i': '#FFFF00'
    }

    const colourResult = resultLetters.map(e => colourMap[e]);

    return colourResult;
  }

  function calculateResult(guess) {
    const guessFreq = guess.reduce((acc, e) => {
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
      
      // Labelling the guess:
      //  When guess letter with gF > 1, guessFreq[i] - answerFreq[i] = 1 where answer e = guess e
      //  guess: speed: e:> gF 2
      //  answer: abide: e:> aF 1
      //  set the > aF instances of the double, triple to 'e'
 
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

  function calculateRemaining(guess, resultLetters) {
    let newDict = dict;

    const freq = guess.reduce((acc, e) => {
      if(acc[e] === undefined) {
        acc[e] = 1
      } else {
        ++acc[e]
      }
      return acc;
    }, {});
  
    const res = _.zip(guess, resultLetters, guess.map((_, i) => i));
    
    for(let i = 0; i < res.length; i++) {
      const [ guessLetter, resultLetter, answerLetterIndex ] = res[i];
      if(resultLetter === "e") {
        // remove words containing guessLetter freq 1 or guessLetter in this place freq > 1
        newDict = newDict.filter(e => (freq[guessLetter] > 1) ? e[answerLetterIndex] !== guessLetter : e.search(guessLetter) < 0 );
      }
      if(resultLetter === "c") {
        // keep words current letter === guessed letter
        newDict = newDict.filter(e => e[answerLetterIndex] === guessLetter)
        // remove words current letter !== guessed letter
        for (let i = 0; i < newDict.length; i++) {
          const word = newDict[i];
          if(word[answerLetterIndex] !== guessLetter) {
            newDict.splice(word);
          }
        }
      }
      if(resultLetter === "i") {
        // keep words included letter appears in remainder of word
        newDict = newDict.filter(e => e.replace(e[answerLetterIndex], '').includes(guessLetter) && e);
        // remove words included letter in this place
        newDict = newDict.filter(e => e[answerLetterIndex] !== guessLetter);
      }
    }
  
    return newDict;
  }

  const OnHandler = (e) => {
    // e.preventDefault();
    // if together input contains ctrl or shift, don't do input 

    // No more input, you guessed the word
    if(dictLength === 1) {
      return;
    }

    if (e?.currentTarget?.id?.includes('backspace') || e?.key === 'Backspace') {
      if(displayTextArray.length === (allowableWords - 1) * lengthValue) {
        // setAllowableWordsLength(allowableWords - 1);
        return; 
      }
      removeDisplayText();
    } else if (e?.currentTarget?.id?.includes('enter') || e?.key === 'Enter') {
      // Enter only works when the length of displayTextArray % lengthValue = 0
      if ( displayTextArray.length === allowableWords * lengthValue && displayTextArray.length % lengthValue === 0) {
        // Last 5 letters of displayTextArray - the last guess
        setGuess(displayTextArray.slice(-5));
        setEnterPressed(enterPressed + 1);
        // Increases the allowable input from N to N + 1 allowableWords
        if(enterPressed < 1) {
          setAllowableWordsLength(allowableWords + 1);
        }
      }
    } else if (letterList.includes(e?.target?.innerText?.toLowerCase()) || letterList.includes(e?.key)) {
      // Prevent double pressing enter on the end of a word and getting access to more rows than the next one
      if(enterPressed >= 1) {
        setEnterPressed(0);
      }
      // Do not allow more than one word to be entered at a time
      if(displayTextArray.length >= allowableWords * lengthValue) {
        return;
      }
      // Do not allow more than rowsValue words to be entered
      if(displayTextArray.length === lengthValue * rowsValue) {
        return;
      }
      if (e?.key) {
        updateDisplayText(e?.key);  
      } else {
        updateDisplayText(e?.target?.innerText?.toLowerCase());
      }
    } 
  }

  return <div className="app" ref={appRef} tabIndex={-1} onKeyDown={OnHandler}>
    <div className="header_parent">
      <div className="nav_parent">
        <nav className="nav">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Github</li>
          </ul>
        </nav>
      </div>
      <header className="app_header">
        <div className="page_title">
          <h1>Wordle Solver</h1>
          <hr className="line_break"></hr>
        </div>
      </header>
      <div className="nav_parent"></div>
    </div>
    <div className="main_content_parent">
      <div className="main_content">
        <div className="col_side">
          <div className='spacer'>
            Combinations
          </div>
          <div className='info'>
            {lengthInput}
          </div>
          <div className='info'>
            {rowsInput}
          </div>
          <div className='info'>
            {statesInput}
          </div>
          <div className='info'>
            {possibleDisplay}
          </div>
          <div className='info'>
            {guessesDisplay}
          </div>
          <div className='info'>
            {incorrectDisplay}
          </div>
          <div className='info'>
            <TextDisplay name="winning" value={winning}></TextDisplay>
          </div>
          <div className='info'>
            {disallowedDisplay}
          </div>
        </div>
        <div className="col_middle">
          <div className="grid_container">
            <div className="spacer"></div>
            <GridDisplay>
              {gridDisplayChild(lengthValue, rowsValue, displayTextArray)}
            </GridDisplay>
            <div className="spacer"></div>
          </div>
          <div className="keyboard_container">
            <div className="keyboard_parent">
              <div className="keyboard">
                <div className="keyboard_row_1_parent">
                  {keyRow1()}
                </div>
                <div className="keyboard_row_2_parent">
                  {keyRow2()}
                </div>
                <div className="keyboard_row_3_parent">
                  {keyRow3()}
                </div>
              </div>
            </div>
            <div className="spacer"></div>
          </div>
        </div>
        <div className="col_side">
          <div>Render count is {renderCount.current}</div>
          <div className='spacer'></div>
          <div className='spacer'>Answer</div>
          <div>{answer}</div>
          <div className='spacer'></div>
          <div className='spacer'>Guess</div>
          <div>{guess}</div>
          <div className='spacer'></div>
          <div className='spacer'>Result</div>
          <div>{result}</div>
          <div className='spacer'></div>
          <div className='spacer'>Remaining Words</div>
          <div>{dictLength}</div>

        </div>
      </div>
    </div>
  </div>
}

function App() {
  return Render();
}

export default App;
