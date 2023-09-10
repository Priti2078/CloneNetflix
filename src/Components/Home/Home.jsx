import React, { useEffect,useState} from 'react'
import "./Home.scss"
import axios from "axios";
import {Link} from "react-router-dom"
import{BsFillPlayFill}from "react-icons/bs"

 

const apiKey="1765fea3f8967600b9fe43d4ae65186f"
const url="https://api.themoviedb.org/3"
const imgUrl="https://image.tmdb.org/t/p/original"
const upcoming = "upcoming"
const nowPlaying="now_playing"
const popular="popular"
const topRated="top_rated"
const Card = ({img})=>(
    <img className='card' src={img} alt="cover" />
)

const Row =({
    title,
    arr=[
        ],
}) =>(
     <div className="row">

        <h2>{title}</h2>
    <div>
      
      {
        arr.map((item,index)=>(
            <Card key ={index} img={`${imgUrl}/${item.poster_path}`}/>
    
        ))
      }

      <div>
        </div>
    </div>
</div>
)

const Home = () => {

  const[upcomingMovies,setUpcomingMovies]=useState([])
  const[nowPlayingMovies,setNowPlayingMovies]=useState([])
  const[popularMovies,setPopularMovies]=useState([])
  const[topRatedMovies,setTopRateMovies]=useState([])
  const[genre,setGenre]=useState([]);

  useEffect(()=>{

    const fetchUpcoming =async ()=>{
     const {data:{results}}= await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
     setUpcomingMovies(results)
    };
    const fetchnowPlaying =async ()=>{
      const {data:{results}}= await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
      setNowPlayingMovies(results)
     };
    
    const fetchPopular =async ()=>{
      const {data:{results}}= await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
      setPopularMovies(results)
     };
    
    const fetchTopRated =async ()=>{
      const {data:{results},
    }= await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
      setTopRateMovies(results)
     };
     
    const getAllGenre =async ()=>{
      const {data:{genres},
    }= await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
      setGenre(genres)
     };
    
    
     getAllGenre();
     fetchUpcoming();
     fetchPopular();
     fetchnowPlaying();
     fetchTopRated();
  },[])





  

  return (
    <section className='home'>
        <div className="banner" style={{
          backgroundImage:popularMovies[0]?`url(${imgUrl}/${popularMovies[0].poster_path})`:"rgb(16,16,16)"
        }}>
          {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}


          
            {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
            <div>

        <button>Play <BsFillPlayFill/></button>
        <button>My List</button>
        </div>
            </div>

        <Row title={"Upcoming"} arr={upcomingMovies} />
        <Row title={"Now Playing"} arr={nowPlayingMovies} />
        <Row title={"Popular"} arr={popularMovies} />
        <Row title={"Top Rated"} arr={topRatedMovies} />

        <div className="genreBox">

           {
            genre.map((item)=>(
              <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
            ))
           }

        </div>
       
    </section>
  )
}

export default Home