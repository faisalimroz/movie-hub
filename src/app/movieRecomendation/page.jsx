'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Card from '../../components/card';
import './recomend.css';

const MovieRecommendation = ({ recommendation, id, loading, setLoading }) => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState(recommendation || []);

  const loadMoreMovies = async () => {
    setLoading(true);
    try {
      const movieRecommendation = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_SECRET_KEY}&page=${page+1}`
      );
      setMovies((prevMovies) => [...prevMovies, ...movieRecommendation.data.results]);
      setPage((prevPage) => prevPage + 1); // Increment page
    } catch (error) {
      console.error("Error loading more recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies(recommendation || []);
    setPage(1); // Reset page on ID change
  }, [id, recommendation]);

  return (
    <div className='mt-3'>
      <h1 className='font-bold font-sans text-2xl' style={{ color: '#FF0000' }}>| Movie Recommendation</h1>
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <Card movie={movie} />
          </Link>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={loadMoreMovies}
          className="p-2 btn-grad2 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default MovieRecommendation;
