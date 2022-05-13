import React, { useEffect, useState } from 'react';
import './home.css';

import SearchInput from '../../components/SearchInput/SearchInput';

const api = 'https://kitsu.io/api/edge/'

const Home = () => {
  const [info, setInfo] = useState({});
  const [text, setText] = useState('');

  useEffect(() => {
    if (text) {
      setInfo({})
      fetch(`${api}anime?filter[text]=${text}&page[limit]=10`)
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
        }); 
      }
  }, [text]);

  return (
    <div className='homeSearch'>
      <h2>Animes</h2>
      <p>Digite um anime</p>
      <SearchInput value={text} onChange={(search) => setText(search)} />
      {info.data && (
        <ul className='animesList'>
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle} />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home