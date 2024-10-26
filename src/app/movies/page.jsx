'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '../../components/card';
import './movies.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`,
        { next: { revalidate: 3600 } }
      );
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setLoading(false);
    };

    fetchMovies();
  }, [page,apiKey]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 mt-2">
      <h1 className="text-2xl font-bold font-sans text-2xl" style={{ color: '#FF0000' }}>|Popular Movies</h1>
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <Card movie={movie}></Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={loadMoreMovies}
          className="p-2 rounded btn-grad2"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default MovieList;