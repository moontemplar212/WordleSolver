import './App.css';
import { useState } from 'react'; 
import { TextInput } from './components/inputs/textInput/TextWithLabelInputComponent';
import { TextDisplay } from './components/displays/textDisplay/TextWithLabelDisplayComponent';
import { ArrayTextDisplay } from './components/displays/textDisplay/ArrayWithTextDisplayComponent';
import { GridDisplay } from './components/displays/gridDisplay/GridDisplayComponent';

const render = () => {
  const L = 5, S = 3, R = 2, W = 1;

  /** USE HOOKS!!!!! */

  const [ length, setLength ] = useState(L);

  const history = [];



  let I, D, G, P;

  P = Math.pow(S, L * R);
  I = Math.pow(Math.pow(S, L) - (L + 1), R);
  G = I + W;
  D = P - G;

  let displayTextArray = Array.apply(null, Array(L * R));

  const OnKeyDownHandler = (e) => {
    e.preventDefault();

    console.log(`Key`, e.key);

    const updateDisplayText = (newValue) => {
      if (displayTextArray.includes(undefined)) {
        displayTextArray[displayTextArray.indexOf(undefined)] = newValue
      } else {
        displayTextArray.push(newValue);
      }
      return displayTextArray;
    };

    const removeDisplayText = () => {
      displayTextArray.pop();
      return displayTextArray
    };

    if (e.key === 'Backspace') {
      removeDisplayText();
    } else if (e.key === 'Enter') {
      // TODO
    } else if (e.key) {
      history.push(e.key);
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
            <TextInput name="length" length="1">{L}</TextInput>
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
            <TextDisplay name="disallowed">{D}</TextDisplay>
          </div>
          <div className='info'>
            <TextDisplay name="winning">{W}</TextDisplay>
          </div>
        </div>
        <div className="col_middle" tabIndex={-1} onKeyDown={OnKeyDownHandler}>
          <div className="spacer"></div>
          <GridDisplay>
            <div className="grid_row">
              <div className="grid_col">{displayTextArray[0]}</div>
              <div className="grid_col">{displayTextArray[1]}</div>
              <div className="grid_col">{displayTextArray[2]}</div>
              <div className="grid_col">{displayTextArray[3]}</div>
              <div className="grid_col">{displayTextArray[4]}</div>
            </div>
            <div className="grid_row">
              <div className="grid_col">{displayTextArray[5]}</div>
              <div className="grid_col">{displayTextArray[6]}</div>
              <div className="grid_col">{displayTextArray[7]}</div>
              <div className="grid_col">{displayTextArray[8]}</div>
              <div className="grid_col">{displayTextArray[9]}</div>
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
          <div className='spacer'>Guess History</div>
          <ArrayTextDisplay className='history_list'>{history}</ArrayTextDisplay>
        </div>
      </div>
    </div>
  </div>
}

function App() {
  return render();
}

export default App;
