import React ,{useState,useEffect} from "react";
import Movies from "../components/Movies";
import Loader from "../components/Loader";
import Search from "../components/Search";

export default function Main () {

  const [movies,setMovies]=useState([]);
  const [loading,setLoading]=useState(true);


  useEffect(()=>{
    fetch("https://www.omdbapi.com/?apikey=95f5752b&s=iron")
    .then((response) => response.json())
    .then((data) => {
      if (data.Search) {
        setLoading(false);
        setMovies(data.Search)
      }
    });
  },[])


  const searchMovies = (str, type = "all") => {
    setLoading(true)
    fetch(
      `https://www.omdbapi.com/?apikey=95f5752b&s=${str}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
          setLoading(false)
        } else {
          setMovies([]);
          setLoading(false);
        }
      });
  };

    return (
      <div className="container main">
        <Search searchMovies={searchMovies} />
        {loading ? (
           <Loader />
        ) : (
         <Movies movies={movies} />
        )}
      </div>
    );
  
}
