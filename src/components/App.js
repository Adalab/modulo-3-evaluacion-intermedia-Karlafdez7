import '../styles/App.scss';
import characters from '../data/characters.json';
import { useState } from 'react';

function App() {
  const[quotes, setQuotes] = useState(characters)
  const [filterQuotes, setFilterQuotes] = useState ('');

  const handleQuote =()=>{

  }
  const handleCharacter = () => {

  }

  return ( 
  <div 
    className="App">
      <header>
          <h1> FRASES DE FRIENDS</h1>
        <form>
          <label htmlFor='searchQuotes'>
            Firltar por frase
          <input 
          type= 'text'
          id='forQuotes'
          onChange ={handleQuote}
          >
          </input>
          </label>
          <label htmlFor='searchCharacters'>
            Firltar por personajes:
          <input
          className='select'
          type='text'
          id='forCharacters'
          onChange={handleCharacter}
          >
          </input>
          </label>
        </form>
      </header>
      <main>

      </main>
  </div>
  );
}

export default App;
