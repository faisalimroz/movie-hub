// app/actions/watchlistActions.js
"use server";

import { addToWatchlist, removeFromWatchlist, getWatchlist } from "./watchlistStore";

// Add movie to watchlist
export async function addMovieToWatchlist(movie) {
  addToWatchlist(movie);
}

// Remove movie from watchlist
export async function removeMovieFromWatchlist(movieId) {
  removeFromWatchlist(movieId);
}

// Get the current watchlist
export async function fetchWatchlist() {
  return getWatchlist();
}