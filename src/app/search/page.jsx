'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import MovieList from '../movies/page';
import Card from '../../components/card';

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const [movies, setMovies] = useState([]);
    const apiKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    useEffect(() => {
        if (query) {
          
            const fetchMovies = async () => {
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
                    setMovies(response.data.results);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                }
            };

            fetchMovies();
        }
    }, [query]);

    return (
        <>
          <div className="container mx-auto px-4 search-results">
            <h1 className='font-bold text-xl mb-2'>|Search Results for "{query}"</h1>
            <div className=" mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <Link key={movie.id} href={`/movies/${movie.id}`}>
                            <Card movie={movie}></Card>
                        </Link>
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </div>
            
        </div>
        <MovieList></MovieList>
        </>
    );
};

export default SearchPage;
