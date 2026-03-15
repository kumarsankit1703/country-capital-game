import './App.css';
import Game from './Game';

 const DATA = {
        'India': 'Delhi',
        'Russia': 'Moscow',
        'China': 'Berlin'
    }

function App() {
  return (
    <div className="App">
      <Game data={DATA} />
    </div>
  );
}

export default App;
