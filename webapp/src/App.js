import './App.css';
import React from 'react';
import { useEffect, useState } from 'react'; 
import { TextInput } from './components/inputs/textInput/TextWithLabelInputComponent';
import { TextDisplay } from './components/displays/textDisplay/TextWithLabelDisplayComponent';
import { GridDisplay } from './components/displays/gridDisplay/GridDisplayComponent';

const Render = () => {
  let [ lengthValue, setLengthValue ] = useState(5);
  let [ statesValue, setStatesValue ] = useState(3);
  let [ rowsValue, setRowsValue ] = useState(6);
  let [ winning ] = useState(1);
  let [ possibleValue, setPossible ] = useState(Math.pow(statesValue, lengthValue * rowsValue));
  let [ incorrect, setIncorrect ] = useState(Math.pow(Math.pow(statesValue, lengthValue) - (lengthValue + 1), rowsValue));
  let [ guesses, setGuesses ] = useState(incorrect + winning);
  let [ disallowed, setDisallowed ] = useState(possibleValue - guesses);
  let [ displayTextArray, setDisplayTextArray ] = useState([]);
  
  let gridDisplayChild = (lengthValue, rowsValue) => {
    let rows = [];
    let cols = [];
    
    for (let j = 0; j < lengthValue; j++) {
      let col = React.createElement('div', { key: `col_${j}`, className: 'grid_col'});
      cols.push(col);
    }
    
    for (let i = 0; i < rowsValue; i++) {
      let row = React.createElement('div', { key: `row_${i}`, className: 'grid_row'}, cols);
      rows.push(row);
    }
    
    return rows;
  }

  useEffect(() => {
    gridDisplayChild = () => {
      let rows = [];
      let cols = [];
      
      for (let j = 0; j < lengthValue; j++) {
        let col = React.createElement('div', { key: `col_${j}`, className: 'grid_col'});
        cols.push(col);
      }
      
      for (let i = 0; i < lengthValue; i++) {
        let row = React.createElement('div', { key: `row_${i}`, className: 'grid_row'}, cols);
        rows.push(row);
      }
      
      return rows;
    }

    return gridDisplayChild;
  }, [lengthValue, rowsValue]);

  

  const lengthInput = <TextInput name="length" length="1">{lengthValue}</TextInput>;

  useEffect(() => {
    setPossible(Math.pow(statesValue, lengthValue * rowsValue));
  }, [lengthValue, rowsValue, statesValue]);

  useEffect(() => {
    setIncorrect(Math.pow(Math.pow(statesValue, lengthValue) - (lengthValue + 1), rowsValue));
  }, [lengthValue, rowsValue, statesValue]);

  useEffect(() => {
    setGuesses(incorrect + winning);
  }, [incorrect, winning]);

  useEffect(() => {
    setDisallowed(possibleValue - guesses);
  }, [possibleValue, guesses]);

  const OnKeyDownHandler = (e) => {
    e.preventDefault();

    console.log(`Key`, e.key);

    const updateDisplayText = (newValue) => (displayTextArray.includes(undefined)) ?
        displayTextArray[displayTextArray.indexOf(undefined)] = newValue :
        displayTextArray.push(newValue)

    const removeDisplayText = () => displayTextArray.pop();

    if (e.key === 'Backspace') {
      removeDisplayText();
    } else if (e.key === 'Enter') {
      // TODO 
    } else if (e.key) {
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
            <TextInput name="rows" length="1">{rowsValue}</TextInput>
          </div>
          <div className='info'>
            <TextInput name="states" length="1">{statesValue}</TextInput>
          </div>
          <div className='info'>
            <TextDisplay name="possible">{possibleValue}</TextDisplay>
          </div>
          <div className='info'>
            <TextDisplay name="guesses">{guesses}</TextDisplay>
          </div>
          <div className='info'>
            <TextDisplay name="incorrect">{incorrect}</TextDisplay>
          </div>
          <div className='info'>
            <TextDisplay name="winning">{winning}</TextDisplay>
          </div>
          <div className='info'>
            <TextDisplay name="disallowed">{disallowed}</TextDisplay>
          </div>
        </div>
        <div className="col_middle" tabIndex={-1} onKeyDown={OnKeyDownHandler}>
          <div className="spacer"></div>
          <GridDisplay>
            {gridDisplayChild()}
          </GridDisplay>
          <div className="spacer"></div>
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
        </div>
        <div className="col_side">
          <div className='spacer'>Placeholder</div>
        </div>
      </div>
    </div>
  </div>
}

function App() {
  return Render();
}

export default App;
