import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { TextInput } from './components/inputs/textInput/TextWithLabelInputComponent';
import { TextDisplay } from './components/displays/textDisplay/TextWithLabelDisplayComponent';
import { GridDisplay } from './components/displays/gridDisplay/GridDisplayComponent';

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

  let gridDisplayChild = (lengthValue, rowsValue, letters) => {
    let rows = [];
    let cols = [];

    // https://stackoverflow.com/questions/2151084/map-a-2d-array-onto-a-1d-array
    // 2D [width * height] = 1D [width * row + col]

    for (let j = 0; j < lengthValue * rowsValue; j++) {
      let col = React.createElement('div', { key: `col_${j}`, className: 'grid_col', children: letters[j] || null});
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

  let renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });
  
  // useEffect(() => {
  //   return () => {
  //     setPossibleValue(Math.pow(statesValue, lengthValue * rowsValue));
  //     setGuessesValue(incorrectValue + winning);
  //     setIncorrectValue(Math.pow(Math.pow(statesValue, lengthValue) - (lengthValue + 1), rowsValue));
  //     setDisallowedValue(possibleValue - guessesValue);
  //   }
  // }, [lengthValue, rowsValue, statesValue, incorrectValue, winning, possibleValue, guessesValue]);



  const OnKeyDownHandler = (e) => {
    e.preventDefault();

    console.log(`Key`, e.key);

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

    if (e.key === 'Backspace') {
      removeDisplayText();
      console.log(`DTAL`, displayTextArray.length);
      console.log(`AW`, allowableWords);
      if(displayTextArray.length < (allowableWords - 1) * lengthValue) {
        setAllowableWordsLength(allowableWords - 1); 
      }
    } else if (e.key === 'Enter') {
      // Enter only works when the length of displayTextArray % lengthValue = 0
      if ( displayTextArray.length % lengthValue === 0) {
        setEnterPressed(enterPressed + 1);
        console.log(`EPE`, enterPressed);
        // Increases the allowable input from N to N + 1 allowableWords
        if(enterPressed < 1) {
          setAllowableWordsLength(allowableWords + 1);
        }
      }
    } else if (e.key) {
      if(enterPressed >= 1) {
        setEnterPressed(0);
      }
      console.log(`EPK`, enterPressed);
      // Checks for N * lengthValue, as a word, and increases the allowable input above
      if(displayTextArray.length >= allowableWords * lengthValue) {
        return;
      }
      if(displayTextArray.length === lengthValue * rowsValue) {
        return;
      }
      updateDisplayText(e.key);
    }
    console.log(`DTA`, displayTextArray);
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
          <div className='spacer'>Placeholder</div>
          <div className='spacer'></div>
          <div>Render count is {renderCount.current}</div>
        </div>
      </div>
    </div>
  </div>
}

function App() {
  return Render();
}

export default App;
