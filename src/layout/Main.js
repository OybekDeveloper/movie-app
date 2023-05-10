import React from "react";
import Movies from "../components/Movies";
import Loader from "../components/Loader";
import Search from "../components/Search";

export default class Main extends React.Component {
  state = {
    movies: [],
    loading:true
  };

  componentDidMount() {
    fetch("http://www.omdbapi.com/?apikey=95f5752b&s=panda")
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          this.setState({ movies: data.Search , loading:false });
        }
      });
  }

  searchMovies = (str, type = "all") => {
    this.setState({loading:true})
    fetch(
      `http://www.omdbapi.com/?apikey=95f5752b&s=${str}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          this.setState({ movies: data.Search ,loading: false });
        } else {
          this.setState({ movies: [] ,loading:false});
        }
      });
  };

  render() {
    return (
      <div className="container main">
        <Search searchMovies={this.searchMovies} />
        {this.state.loading ? (
           <Loader />
        ) : (
         <Movies movies={this.state.movies} />
        )}
      </div>
    );
  }
}
