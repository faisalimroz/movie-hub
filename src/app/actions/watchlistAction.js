
"use client";

export async function fetchWatchlist() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  }
  return [];
}

export async function addMovieToWatchlist(movie) {
  let watchlist = await fetchWatchlist();
  if (!watchlist.find((m) => m.id === movie.id)) {
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}

export async function removeMovieFromWatchlist(movieId) {
  let watchlist = await fetchWatchlist();
  watchlist = watchlist.filter((movie) => movie.id !== movieId);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}
