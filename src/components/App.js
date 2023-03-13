import '../styles/App.scss';
import characters from '../data/characters.json';
import { useState } from 'react';

function App() {
  const[quotes, setQuotes] = useState(characters)
  const [filterQuotes, setFilterQuotes] = useState ('');
  const [filterCharacters, setFilterCharacters] = useState('Personajes');

  const handleQuote = (event)=> {
      setFilterQuotes(event.target.value);
  }
  
  const handleCharacter = (event) => {
      setFilterCharacters(event.target.value)
  }


  const renderListQuotes = () => {
    return characters 
      .filter ((eachQuote)=> {
        return (eachQuote.quote.toLowerCase().includes(filterQuotes.toLowerCase()))
      })
      .filter ((eachCharacter) =>{
        if (filterCharacters !== 'Personajes') {
         return (eachCharacter.character.toLowerCase() === (filterCharacters.toLowerCase()))
        } else {
          return eachCharacter; 
        }

      })
      .map ((eachQuote, index)=>{
        return (
          <li key={index} className='card'>
            <p>{eachQuote.quote}</p>
            <p>{eachQuote.character}</p>
          </li>
        )
      })
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
          id='Quotes'
          onChange ={handleQuote}
          value= {filterQuotes}
          >
          </input>
          </label>
          <label htmlFor='searchCharacters'>
            Firltar por personajes:
          <select name='character' id='character' onChange={handleCharacter}>
            <option value='Personajes'>Personajes </option>
            <option value='Ross'> Ross </option>
            <option value='Joey'> Joey </option>
            <option value='Phoebe'> Phoebe</option>
            <option value='Chandler'> Chandler</option>
            <option value='Rachel'> Rachel </option>
            <option value='Mónica'> Mónica </option>
          </select>
          </label>
        </form>
      </header>
      <main>
        <ul>
          {renderListQuotes()}
        </ul>
      </main>
  </div>
  );
}

export default App;
