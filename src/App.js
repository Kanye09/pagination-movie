import React, { useState, useEffect } from 'react';
import { BiCameraMovie } from 'react-icons/bi';
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineNumber } from 'react-icons/ai';
import './App.css';

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState('');
  const [page, setPage] = useState(1);
  const [starting, setStarting] = useState(true);

console.log('data', data)
  const getData = () => {
    setLoading(true)
    fetch('https://api.themoviedb.org/3/person/popular?api_key=df8b08ecb436696fee41a00f8d87a540&language=en&page='+ page)
    .then(res => res.json())
    .then(res => {
      setTimeout(() => {
        setData(res.results)
        setLoading(false)
      }, 1000)
    })
  }

  console.log('data', data)
      
  useEffect(() => {
    setTimeout(() => {
      getData()
      setStarting(false)
    }, 3000)
  }, [])

  const next = () => {
    setPage(page + 1)
    getData()
  }

  const prev = () => {
    if (page === 1) {
      return
    }
    setPage(page - 1)
    getData()
  }

  return (
      starting?
      <img src='https://media.giphy.com/media/Vw3k4Vro0Q5KE/giphy.gif' alt='starting' style={{with: '100%', height: '100vh'}} />
      :
      <div className='home'>
      <div className='nav'>
        <div className='logo'>
          <BiCameraMovie />
        </div>
        <div className='pagination'>
          <AiFillCaretLeft onClick={prev} />
          
          { page === 1 ? <AiOutlineNumber/> : page - 1 }
          
          <strong>{ page }</strong>
          
          { page + 1 }
          
          <AiFillCaretRight onClick={next}/>
        </div>  
      </div>
      {
            loading
            ?
            <div className='loading'>
              <img src='https://media.giphy.com/media/STwf2H0syjqwVW8pql/giphy.gif' alt='loading' />
            </div>
            :
            <div className='all'>
              {
                data.map(actor => {
                  return (
                   <div class="row">
                         <div class="card">
                         <img src={actor.profile_path ? 'http://image.tmdb.org/t/p/w185/' + actor.profile_path : 'https://avatars2.githubusercontent.com/u/3010387?s=400&v=4'} />
                          <div className='actorName'>
                              {actor.profile_path ? actor.name : 'Marat Gaipov'}
                         </div>
                      </div>
                 </div>
              )
             })
              }
            </div>
      }

    </div>
  )
}

export default App;
