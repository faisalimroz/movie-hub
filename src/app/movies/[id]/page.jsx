'use client';
import { useState, useEffect } from 'react';
import MovieRecommendation from '../../movieRecomendation/page';
import { addMovieToWatchlist, removeMovieFromWatchlist } from '../../actions/watchlistAction';
import Image from 'next/image';
import './page.css';
import Loading from '../../../components/Loading';
import { MovieSchema, CreditsSchema } from '../../../components/schema'; 

const MovieDetail = ({ params }) => {
  const { id } = params;
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [recommendation, setRecommendation] = useState([]);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // Add loading state here

  const apiKey = process.env.NEXT_PUBLIC_SECRET_KEY;

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        ).then((res) => res.json());

        MovieSchema.parse(movieResponse);
        setMovie(movieResponse);

        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
        ).then((res) => res.json());

        CreditsSchema.parse(creditsResponse);
        setCredits(creditsResponse);

        const recommendationsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&page=1`
        ).then((res) => res.json());

        setRecommendation(recommendationsResponse.results);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details. Please try again later.");
      }
    }

    fetchMovieDetails();
  }, [id]);

  const handleWatchlistToggle = async () => {
    if (isInWatchlist) {
      await removeMovieFromWatchlist(movie.id);
    } else {
      await addMovieToWatchlist(movie);
    }
    setIsInWatchlist(!isInWatchlist);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movie || !credits) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="movie-details shadow-xl">
        <Image
          className="w-auto h-64 max-w-md mb-4 mx-auto"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={100}
          height={100}
        />
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <p className="mb-4">{movie.overview}</p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <h2 className="text-xl font-bold mt-4">Cast:</h2>
        <ul>
          {credits.cast.slice(0, 5).map((actor) => (
            <li key={actor.cast_id}>
              {actor.name} as {actor.character}
            </li>
          ))}
        </ul>

        <button
          onClick={handleWatchlistToggle}
          className="mt-4 btn-grad rounded h-14 w-auto mt-2"
        >
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>

      {/* Pass loading and setLoading as props */}
      <MovieRecommendation 
        recommendation={recommendation} 
        id={id} 
        loading={loading} 
        setLoading={setLoading} 
      />
    </div>
  );
};

export default MovieDetail;
