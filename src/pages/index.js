import { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'; 
  
export default function App() { 
  const [data, setData] = useState(''); 
  const [searchWord, setSearchWord] = useState(''); 
  
  async function getMeaning() { 
    try { 
      const response = await fetch( 
        `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}` 
      ); 
      const data = await response.json(); 
      setData(data[0]); 
    } catch (error) { 
      console.error('Error fetching data:', error); 
    } 
  } 
  
  function playAudio() { 
    if (data.phonetics && data.phonetics[0] && data.phonetics[0].audio) { 
      let audio = new Audio(data.phonetics[0].audio); 
      audio.play(); 
    } 
  } 
  
  return ( 
    <div className="container"> 
      <h1 className="heading"> 
        Dictionary <span>App</span>{' '} 
      </h1> 
      <div className="searchBox"> 
        <input 
          type="text"
          placeholder="Search..."
          onChange={(e) => { 
            setSearchWord(e.target.value); 
          }} 
        /> 
        <button 
          onClick={() => { 
            getMeaning(); 
          }} 
        > 
          <FontAwesomeIcon icon={faSearch} size="lg" /> 
        </button> 
      </div> 
      {data && ( 
        <div className="showResults"> 
          <h2>{data.word}</h2> 
          <button 
            onClick={() => { 
              playAudio(); 
            }} 
          > 
            <FontAwesomeIcon icon={faVolumeUp} size="sm" /> 
          </button> 
          <div className="table-container"> 
            <table> 
              <tr> 
                <td>Parts of Speech:</td> 
                <td>{data.meanings[0].partOfSpeech}</td> 
              </tr> 
              <tr> 
                <td>Definition:</td> 
                <td>{data.meanings[0].definitions[0].definition}</td> 
              </tr> 
              <tr> 
                <td>Example:</td> 
                <td>{data.meanings[0].definitions[0].example}</td> 
              </tr> 
            </table> 
          </div> 
        </div> 
      )} 
    </div> 
  ); 
} 