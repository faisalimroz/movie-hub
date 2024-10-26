import Image from 'next/image';
import React from 'react';

const Card = ({movie}) => {
    return (
        <div className="border p-2 rounded cursor-pointer shadow-lg transform transition-transform hover:scale-105 overflow-hidden ">
            <Image
                className="w-full h-64 object-cover mb-2"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                width={100} 
                height={100} 
            />
            <h2 className="text-lg font-semibold font-mono truncate">{movie.title}</h2>
            <p className="text-sm decoration-black">{movie.release_date.slice(0,4)}</p>
            <p className="text-sm decoration-black"><strong>Popularity:</strong> {movie.popularity}</p>
        </div>
    );
};

export default Card;