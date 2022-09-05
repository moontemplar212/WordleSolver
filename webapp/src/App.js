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
          <div className="grid_display_parent">
            <table className="grid_display">
              <tr className="table_row">
                <td className="table_div">a</td>
                <td className="table_div">b</td>
                <td className="table_div">c</td>
                <td className="table_div">d</td>
                <td className="table_div">e</td>
              </tr>
              <tr className="table_row">
                <td className="table_div">f</td>
                <td className="table_div">g</td>
                <td className="table_div">h</td>
                <td className="table_div">i</td>
                <td className="table_div">j</td>
              </tr>
              <tr className="table_row">
                <td className="table_div">k</td>
                <td className="table_div">l</td>
                <td className="table_div">m</td>
                <td className="table_div">n</td>
                <td className="table_div">o</td>
              </tr>
              <tr className="table_row">
                <td className="table_div">p</td>
                <td className="table_div">q</td>
                <td className="table_div">r</td>
                <td className="table_div">s</td>
                <td className="table_div">t</td>
              </tr>
              <tr className="table_row">
                <td className="table_div">u</td>
                <td className="table_div">v</td>
                <td className="table_div">w</td>
                <td className="table_div">x</td>
                <td className="table_div">y</td>
              </tr>
            </table>
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
