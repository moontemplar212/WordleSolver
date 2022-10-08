import './App.css';
import { TextInput } from './components/inputs/textInput/textInputComponent';
import { TextDisplay } from './components/displays/textDisplay/textDisplayComponent';
import { useState, useEffect } from 'react';

const render = () => {
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
            <TextInput name="length" length="10">{L}</TextInput>
          </div>
          <div className='info'>
            <TextInput name="rows" length="1">{R}</TextInput>
          </div>
          <div className='info'>
            <TextInput name="states" length="1">{S}</TextInput>
          </div>
          <div className='info'>
            <TextDisplay name="possible">{P}</TextDisplay>
          </div>
          <div className='info'>
            <TextDisplay name="guesses">{G}</TextDisplay>
          </div>
          <div className='info'>
            <TextDisplay name="incorrect">{I}</TextDisplay>
          </div>
          <div className='info'>
            {/**
             * 5 * XXXXI followed by 2nd row all possible = 5 * ( 237 + 1 ) = 1190
             * All possible 1st row followed by 5 * XXXXI = 5 * ( 237 + 1 ) = 1190
             *                                                              = 2380
             * 499: 
             *                                                              ------
             *                                                              = 2879
             */}
            <TextDisplay name="disallowed">{D}</TextDisplay>
          </div>
          <div className='info'>
            <TextDisplay name="winning">{W}</TextDisplay>
          </div>
        </div>
        <div className="col_middle">
          <div className="spacer"></div>
          <div className="grid_display" onKeyDown={onKeyDownHandler}>
            <div className="grid_row">
              <div className="grid_col">a</div>
              <div className="grid_col">b</div>
              <div className="grid_col">c</div>
              <div className="grid_col">d</div>
              <div className="grid_col">e</div>
            </div>
            <div className="grid_row">
              <div className="grid_col">f</div>
              <div className="grid_col">g</div>
              <div className="grid_col">h</div>
              <div className="grid_col">i</div>
              <div className="grid_col">j</div>
            </div>
            <div className="grid_row">
              <div className="grid_col">q</div>
              <div className="grid_col">w</div>
              <div className="grid_col">e</div>
              <div className="grid_col">r</div>
              <div className="grid_col">t</div>
            </div>
            <div className="grid_row">
              <div className="grid_col">y</div>
              <div className="grid_col">u</div>
              <div className="grid_col">i</div>
              <div className="grid_col">o</div>
              <div className="grid_col">p</div>
            </div>
            <div className="grid_row">
              <div className="grid_col">z</div>
              <div className="grid_col">x</div>
              <div className="grid_col">x</div>
              <div className="grid_col">c</div>
              <div className="grid_col">v</div>
            </div>
            <div className="grid_row">
              <div className="grid_col">t</div>
              <div className="grid_col">g</div>
              <div className="grid_col">h</div>
              <div className="grid_col">j</div>
              <div className="grid_col">n</div>
            </div>
          </div>
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
          <div className='spacer'>Guess History</div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
}

function App() {
  /**
   * Wordle combination counts
   * 
   * L: Length of words in a row ( number of letters )
   * S: Number of states of each letter
   * R: Number of rows
   * I: Number of incorrect guesses
   * D: Number of disallowed guesses
   * W: Number of winning guesses, always 1
   * G: Total guesses
   * P: All possible guesses
   * 
   */

  const L = 5, S = 3, R = 2, W = 1;

  let I, D, G, P;

  P = Math.pow(S, L*R);
  I = Math.pow(Math.pow(S, L) - (L + 1), R);
  G = I + W;
  D = P - G;

  const [ displayTextArray, setDisplayTextArray ] = useState(Array.apply(null, L * R));

  /**
   * I have a display grid with L * R letters => an array L * R long
   * 
   * When a keyEvent happens, then I want to push that keyValue to the first position that is null
   * 
   * And render the array values into each child in order
   * 
   * If a backspace keyEvent is fired then delete the last non null value from the Array
   * 
   * 
   */

  // keyDown
  const onKeyDownHandler = (e) => {
    if(e.key === 'Backspace') {
      setDisplayTextArray( oldArray => [])   
    }
    // if(e.key === 'Enter') {
    //   validateGame();
    // }
    const keyValue = e.target.value;
    setDisplayText(oldValue => [...oldValue, ...newValue ]);
  }

  useEffect(() => {
    setDisplayTextArray( oldArray => [ ...oldArray, ...newValue ] );
  }, oldArray)

  return render();
}

export default App;
