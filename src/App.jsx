import { useState } from "react";

import movies from "./movies";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFullDesc, setShowFullDesc] = useState(false);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {selectedMovie ? (
        <div className="movie-details">
          <h1>{selectedMovie.title}</h1>
          <img className="movie-poster" src={selectedMovie.poster} alt={selectedMovie.title} />

          {/* EMBEDDED YOUTUBE TRAILER */}
          <div className="trailer-container">
            <iframe
              width="100%"
              height="400"
              src={selectedMovie.trailer}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          {/* MOVIE DESCRIPTION */}
          <p className="description">
            {showFullDesc ? selectedMovie.description : selectedMovie.description.slice(0, 100) + "..."}
            <button className="read-more-btn" onClick={() => setShowFullDesc(!showFullDesc)}>
              {showFullDesc ? "Show Less" : "Read More"}
            </button>
          </p>

          {/* BUTTONS */}
          <div className="button-group">
            <a href={selectedMovie.file} download target="_blank" rel="noopener noreferrer">
              <button className="download-btn"> Download Movie</button>
            </a>
            <button className="back-btn" onClick={() => setSelectedMovie(null)}>Back</button>
          </div>
        </div>
      ) : (
        <div>
          <h1>WEFLEX</h1>

          {/* SEARCH BOX */}
          <input 
            type="text" 
            placeholder="Search movies..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box"
          />

          {/* MOVIE LIST */}
          <div className="movies">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <div key={movie.id} className="movie-card" onClick={() => { setSelectedMovie(movie); setShowFullDesc(false); }}>
                  <img src={movie.poster} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </div>
              ))
            ) : (
              <p className="no-results">No movies found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
