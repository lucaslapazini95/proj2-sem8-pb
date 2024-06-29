import { useEffect, useState } from "react";
import Footer from "./Footer";
import { detail } from "../types/Tmdb";
import {
  fetchMoviesDetailsById,
  fetchRandomMovieTvDetails,
} from "../apiService/apiService";
import Hero from "./Hero";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [randomTrendMovie, setRandomTrendMovie] = useState<detail | null>(null);
  const [movieClicked, setMovieClicked] = useState<detail | null>(null);
  const { id } = useParams<{ id: string }>();

  const fetchRandomTrendMovie = async () => {
    const random = await fetchRandomMovieTvDetails("randomMovieTrending");
    setRandomTrendMovie(random ? random : null);
  };

  useEffect(() => {
    fetchRandomTrendMovie();
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id) {
        const movie = await fetchMoviesDetailsById(id);
        setMovieClicked(movie);
      }
    };
    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      <Hero detail={movieClicked || randomTrendMovie} />
      <Footer />
    </div>
  );
};

export default Movie;
