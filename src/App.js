import React, { useEffect, useState } from "react";
//1f3ee8f1 -> OMDB API Key
import './app.css'
import MovieCard from "./movieCard";
import SearchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com?apikey=1f3ee8f1'

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        setMovies(data.Search)
        console.log(data)
    }
    useEffect(() => {
        searchMovies(searchTerm)
    }, [])
    return (
        <div className="app">
            < h1>Movie Search</h1>
            <div className="search">
                <input placeholder="Search Movies" onChange={(e) => setSearchTerm(e.target.value)} />
                <img src={SearchIcon} alt="Alternate Button." onClick={(e)=>searchMovies(searchTerm)}/>
            </div>
            {
                movies && movies.length > 0
                    ? (
                        <div className="container">
                            {
                                movies.map((item) => 
                                  <MovieCard key={item.imdbID} movie={item} />
                                )
                            }

                        </div>

                    )
                    : (
                        <div className="empty">
                            <h2>No Movies Available, Try Search.</h2>
                        </div>
                    )
            }


        </div>
    )
}

export default App