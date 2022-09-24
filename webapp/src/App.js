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
          fkdjalfkhda
        </div>
        <div className="col_middle">
          <div className="grid_display">
            <div className="grid_row">
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
            </div>
            <div className="grid_row">
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
            </div>
            <div className="grid_row">
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
            </div>
            <div className="grid_row">
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
            </div>
            <div className="grid_row">
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
            </div>
            <div className="grid_row">
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
              <div className="grid_col"></div>
            </div>
          </div>
        </div>
        <div className="col_side">
          fkdjalfkhda
        </div>
      </div>
    </div>
  </div>
}

function App() {
  return render();
}

export default App;
