import './App.css';

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
      <div className="nav_parent">
      </div>
    </div>
    <div className="main_content_parent">
      <div className="main_content">
        <div className="col_side">
          col left
        </div>
        <div className="col_middle">
          <div className="spacer"></div>
          <div className="grid_display">
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
          col right
        </div>
      </div>
    </div>
  </div>
}

function App() {
  return render();
}

export default App;
