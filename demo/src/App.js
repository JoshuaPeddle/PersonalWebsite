import logo from "./logo.svg";
import Button from "./components/button";
import "./App.css";
  
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" 
             alt="logo" />
          
        <p>A simple React app.....</p>
        <Button></Button>
        <form action="../../" method="POST" 
              className="form">
          <button type="submit">Connected?</button>
        </form>
      </header>
    </div>
  );
}
  
export default App;