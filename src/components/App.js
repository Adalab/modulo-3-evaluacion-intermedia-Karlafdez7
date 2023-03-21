import '../styles/App.scss';
import characters from '../data/characters.json';
import { useEffect,useState } from 'react';
import objectToExport from '../services/localstorage';

function App() {
  const[quotes, setQuotes] = useState(objectToExport.get ('local', characters) );
  const [filterQuotes, setFilterQuotes] = useState ('');
  const [filterCharacters, setFilterCharacters] = useState('Personajes');
  const [newPhrase, setNewPhrase] = useState({
    quote: '',
    character: '',
  });
  const [beta, setBeta] = useState([]);


   useEffect(() => {
    fetch(
      'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
    )
      .then((response) => response.json())
      .then((fetchData) => {
        setBeta(fetchData);
      });
  }, []);


  const handleQuote = (event)=> {
      setFilterQuotes(event.target.value);
  }
  
  const handleCharacter = (event) => {
      setFilterCharacters(event.target.value)
  }

  const handleNewPhrase = (ev) => {
    setNewPhrase({ ...newPhrase, [ev.target.id]: ev.target.value });
  };

  const handleClickAdd = (ev) => {
    ev.preventDefault();
    setQuotes([...characters, newPhrase]);
    setNewPhrase({ quote: '', character: '' });
  };


  const renderListQuotes = () => {
    objectToExport.set('local', quotes);
    return quotes 
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
          <li className="list-quotes_item" key={index} >
            <p className='list-quotes_item_quote'>{eachQuote.quote}</p>
            <p className='list-quotes_item_character'>{eachQuote.character}</p>
          </li>
        )
      })
  }

  return ( 
  <div 
    className="App">
      <header className='container-title'>
          <h1 className='title'> FRASES DE FRIENDS</h1>
        <form className='form'>
          <label className='form-quotes' htmlFor='searchQuotes'>
            Filtrar por frase: 
          <input className='form-quotes_text'
          type= 'text'
          id='Quotes'
          onChange ={handleQuote}
          value= {filterQuotes}
          >
          </input>
          </label>
          <label className='form-characters' htmlFor='searchCharacters'>
            Firltar por personajes:
          </label>
          <select className='form-characters_select' name='character' id='character' onChange={handleCharacter} value={filterCharacters}>
            <option value='Personajes'>Personajes </option>
            <option value='Ross'> Ross </option>
            <option value='Joey'> Joey </option>
            <option value='Phoebe'> Phoebe</option>
            <option value='Chandler'> Chandler</option>
            <option value='Rachel'> Rachel </option>
            <option value='Mónica'> Mónica </option>
          </select>
          
        </form>
      </header>
      <main className='main'>
        <section className='containter-quotes'> 
          <ul className='list-quotes'>
            {renderListQuotes()}
          </ul>
        </section>
        <section className='container-newPhrase'>
         <form action="">
           <h2 className='title-newPhrase'>Añade nueva frase</h2>
           <label htmlFor=""> Frase: 
             <input
                className="new-quote__input"
                type="text"
                name="quote"
                id="quote"
                placeholder='frase'
                onInput={handleNewPhrase}
                value={newPhrase.quote}
              />
           </label>
           <label htmlFor=""> Personaje: 
 
             <input
                className="new-character__input"
                type="text"
                name="character"
                id="character"
                placeholder="Personaje"
                onInput={handleNewPhrase}
                value={newPhrase.character}
              />
           </label>
            
            <input
              className="new-quote-btn"
              type="submit"
              value="Añadir"
              onClick={handleClickAdd}
            />
          </form>
        </section>
      </main>
  </div>
  );
}

export default App;
