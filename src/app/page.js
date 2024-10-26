import Image from "next/image";
import Navbar from "../components/navbar";
import MovieList from "./movies/page";

export default function Home() {
  return (
    <div className="min-h-screen">
      
      <MovieList></MovieList>
      
      
      
    </div>
  );
}
