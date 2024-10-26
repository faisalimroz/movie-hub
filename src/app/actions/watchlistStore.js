// watchlistStore.js
let watchlist = [];

// Add movie to watchlist
export function addToWatchlist(movie) {
  if (!watchlist.find((m) => m.id === movie.id)) {
    watchlist.push(movie);
  }
}

// Remove movie from watchlist
export function removeFromWatchlist(movieId) {
  watchlist = watchlist.filter((movie) => movie.id !== movieId);
}

// Get all movies in the watchlist
export function getWatchlist() {
  return watchlist;
}