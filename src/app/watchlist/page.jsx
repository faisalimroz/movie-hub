'use client'
import { useState, useEffect } from 'react';
import { fetchWatchlist, removeMovieFromWatchlist } from '../actions/watchlistAction';
import Image from 'next/image';
import Link from 'next/link';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]); // Initialize watchlist as an empty array

  useEffect(() => {
    async function loadWatchlist() {
      const movies = await fetchWatchlist();
      setWatchlist(movies);
    }

    loadWatchlist();
  }, []);

  const handleRemove = async (movieId) => {
    await removeMovieFromWatchlist(movieId);
    setWatchlist((prevWatchlist) => prevWatchlist.filter((movie) => movie.id !== movieId));
  };

  if (!Array.isArray(watchlist) || watchlist.length === 0) { // Check if watchlist is an array
    return <div className='min-h-screen flex items-center justify-center'><p>Your watchlist is empty.</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className='font-bold '>Your Watchlist</h1>

      <div className='mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {watchlist.map((movie) => (
          <div key={movie.id} className="border p-2 rounded cursor-pointer shadow-lg overflow-hidden">
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <Image
                className="w-full h-64 object-cover mb-2"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                width={100}
                height={100}
              />
              <h2 className="text-lg font-semibold font-mono truncate">{movie.title}</h2>
              <p className="text-sm decoration-black">{movie.release_date.slice(0, 4)}</p>
              <p className="text-sm decoration-black"><strong>Popularity:</strong> {movie.popularity}</p>
            </Link>

            <button
              onClick={() => handleRemove(movie.id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
