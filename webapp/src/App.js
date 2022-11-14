import './App.css';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TextInput } from './components/inputs/textInput/TextWithLabelInputComponent';
import { TextDisplay } from './components/displays/textDisplay/TextWithLabelDisplayComponent';
import { GridDisplay } from './components/displays/gridDisplay/GridDisplayComponent';
const _ = require('lodash');

let dict = require("./dictionaryFive.json");

const answer = dict[Math.floor(Math.random() * (dict.length - 0 + 1) + 0)];

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

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  useEffect(() => {
    Array.from(new Array(lengthValue * rowsValue)).map((_, i) => colRefs.current[i] = React.createRef());
  }, [lengthValue, rowsValue]);

  useEffect(() => {
    let resultLetters = calculateResult(guess);
    setResult(resultLetters);
    const colours = colourValues(resultLetters);
    for (let i = 0; i < colours.length; i++) {
      // This is shitty, allowableWords updates before this happens even though setGuess is called first
      // Bug in useEffect, useRef implementation of my code, too hard for me right now :( where are you Martin 😭
      colRefs.current[i + (lengthValue * (allowableWords - 2))].current.style.backgroundColor = colours[i];
    }
    let remainingWords = calculateRemaining(guess, resultLetters);
    setDictLength(remainingWords.length);
  }, [guess, setResult, setDictLength, lengthValue, rowsValue, allowableWords]);

  let gridDisplayChild = (lengthValue, rowsValue, letters) => {
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
    let resultLetters = guess.map((e,i) => {
      let returnLetter = '';
  
      if (!answer.includes(e)) {
        returnLetter = 'e';
      } 
      let restOfAnswer = answer.substring(0, i) + answer.substring(i + 1);
      if(restOfAnswer.includes(e)) {
        returnLetter = 'i';
      }
      if(e === answer[i]) {
        returnLetter = 'c';
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

  const OnKeyDownHandler = (e) => {
    e.preventDefault();

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

    // No more input, you guessed the word
    if(dictLength === 1) {
      return;
    }

    if (e.key === 'Backspace') {
      if(displayTextArray.length === (allowableWords - 1) * lengthValue) {
        // setAllowableWordsLength(allowableWords - 1);
        return; 
      }
      removeDisplayText();
    } else if (e.key === 'Enter') {
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
    } else if (letterList.includes(e.key.toLowerCase())) {
      if(enterPressed >= 1) {
        setEnterPressed(0);
      }
      // Checks for N * lengthValue, as a word, and increases the allowable input above
      if(displayTextArray.length >= allowableWords * lengthValue) {
        return;
      }
      if(displayTextArray.length === lengthValue * rowsValue) {
        return;
      }
      updateDisplayText(e.key);
    }
  }

  return <div className="app">
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
          <div className="grid_container" tabIndex={-1} onKeyDown={OnKeyDownHandler}>
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
                  <div className="keyboard_row_1">
                    <div className="key">q</div>
                    <div className="key">w</div>
                    <div className="key">e</div>
                    <div className="key">r</div>
                    <div className="key">t</div>
                    <div className="key">y</div>
                    <div className="key">u</div>
                    <div className="key">i</div>
                    <div className="key">o</div>
                    <div className="key">p</div>
                  </div>
                </div>
                <div className="keyboard_row_2_parent">
                  <div className="keyboard_row_2">
                    <div className="key">a</div>
                    <div className="key">s</div>
                    <div className="key">d</div>
                    <div className="key">f</div>
                    <div className="key">g</div>
                    <div className="key">h</div>
                    <div className="key">j</div>
                    <div className="key">k</div>
                    <div className="key">l</div>
                  </div>
                </div>
                <div className="keyboard_row_3_parent">
                  <div className="keyboard_row_3">
                    <div className="key_space">⎵</div>
                    <div className="key">z</div>
                    <div className="key">x</div>
                    <div className="key">c</div>
                    <div className="key">v</div>
                    <div className="key">b</div>
                    <div className="key">n</div>
                    <div className="key">m</div>
                    <div className="key_back">⮽</div>
                  </div>
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
