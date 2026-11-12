
"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "../lib/supabase/client";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    let active = true;

    async function loadMovies() {
      const supabase = createSupabaseBrowserClient();

      if (!supabase) {
        if (active) {
          setError("Supabase configuration is missing.");
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("movies")
        .select(`
          id,
          title,
          slug,
          description,
          category,
          release_year,
          language,
          poster_url,
          trailer_url,
          video_path,
          price_rwf,
          access_type,
          download_enabled,
          status,
          rights_confirmed
        `)
        .eq("rights_confirmed", true)
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        setError(error.message);
      } else {
        setMovies(data || []);
      }

      setLoading(false);
    }

    loadMovies();

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        movies.map((movie) => movie.category).filter(Boolean)
      ),
    ],
    [movies]
  );

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || movie.category === category;

    return matchesSearch && matchesCategory;
  });

  function isFree(movie) {
    return String(movie.access_type).toLowerCase() === "free";
  }

  async function shareMovie(movie) {
    const url = `${window.location.origin}/movies/${movie.slug}`;

    if (navigator.share) {
      await navigator.share({
        title: movie.title,
        text: "Discover this movie on AFRISCENE.",
        url,
      });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      alert("Movie link copied!");
    }
  }

  function addComment(movieId) {
    if (!commentText.trim()) return;

    setComments((previous) => ({
      ...previous,
      [movieId]: [
        ...(previous[movieId] || []),
        commentText.trim(),
      ],
    }));

    setCommentText("");
  }

  return (
    <main className="afriscene">

      <header className="main-header">
        <a href="/" className="logo">
          AFRI<span>SCENE</span>
        </a>

        <nav>
          <a href="/">Home</a>
          <a href="#movies">Movies</a>
          <a href="/account">Account</a>
          <a href="/admin">Admin</a>
        </nav>

        <a href="/login" className="login-button">
          Sign In
        </a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">
            AFRICAN CINEMA • GLOBAL STORIES
          </span>

          <h1>
            Discover Stories.
            <br />
            <span>Experience Africa.</span>
          </h1>

          <p>
            Explore African movies, discover new filmmakers
            and enjoy stories from across the continent.
          </p>

          <a href="#movies" className="main-button">
            Explore Movies →
          </a>
        </div>
      </section>

      <section className="catalog" id="movies">

        <div className="section-heading">
          <div>
            <span className="hero-label">OUR COLLECTION</span>
            <h2>Explore Movies</h2>
            <p>Find your next favourite African movie.</p>
          </div>

          <span className="movie-total">
            {filteredMovies.length} Movies
          </span>
        </div>

        <input
          className="movie-search"
          type="search"
          placeholder="Search movies..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="category-buttons">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={category === item ? "active" : ""}
            >
              {item}
            </button>
          ))}
        </div>

        {loading && (
          <p className="notice">Loading movies...</p>
        )}

        {error && (
          <p className="notice error">{error}</p>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="empty-movies">
            <h3>Welcome to AFRISCENE</h3>
            <p>
              Our movie collection is being prepared.
              Please check again soon.
            </p>
          </div>
        )}

        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <article className="movie-card" key={movie.id}>

              <div className="movie-poster">
                {movie.poster_url ? (
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                  />
                ) : (
                  <div className="poster-placeholder">
                    🎬
                  </div>
                )}

                <span className="access-badge">
                  {isFree(movie) ? "FREE" : "PREMIUM"}
                </span>
              </div>

              <div className="movie-details">
                <span className="movie-category">
                  {movie.category || "African Cinema"}
                </span>

                <h3>{movie.title}</h3>

                <p>
                  {movie.release_year || "New Release"} ·{" "}
                  {movie.language || "Multiple Languages"}
                </p>

                <div className="movie-price">
                  {isFree(movie)
                    ? "Free"
                    : `${Number(movie.price_rwf).toLocaleString()} RWF`}
                </div>

                <button
                  className="watch-button"
                  onClick={() => setSelectedMovie(movie)}
                >
                  {isFree(movie) ? "View Movie" : "View Details"}
                </button>

                <div className="movie-actions">
                  <button
                    onClick={() =>
                      setLikes((previous) => ({
                        ...previous,
                        [movie.id]: !previous[movie.id],
                      }))
                    }
                  >
                    {likes[movie.id] ? "♥ Liked" : "♡ Like"}
                  </button>

                  <button onClick={() => shareMovie(movie)}>
                    ↗ Share
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>

      {selectedMovie && (
        <div className="movie-overlay">
          <div className="movie-dialog">

            <button
              className="close-dialog"
              onClick={() => setSelectedMovie(null)}
            >
              ×
            </button>

            {selectedMovie.poster_url && (
              <img
                src={selectedMovie.poster_url}
                alt={selectedMovie.title}
              />
            )}

            <h2>{selectedMovie.title}</h2>

            <p>{selectedMovie.description}</p>

            <p>
              Language: {selectedMovie.language || "Not specified"}
            </p>

            <p>
              {isFree(selectedMovie)
                ? "Free movie"
                : `Premium movie · ${Number(selectedMovie.price_rwf).toLocaleString()} RWF`}
            </p>

            {selectedMovie.download_enabled && (
              <p>
                Download access is subject to purchase
                and payment verification.
              </p>
            )}

            <p className="notice">
              Secure video playback and verified downloads
              will be connected through the streaming and
              payment services.
            </p>

            <div className="comment-area">
              <h3>Comments</h3>

              <textarea
                value={commentText}
                onChange={(event) =>
                  setCommentText(event.target.value)
                }
                placeholder="Write a comment..."
              />

              <button
                onClick={() => addComment(selectedMovie.id)}
              >
                Add Comment
              </button>

              {(comments[selectedMovie.id] || []).map(
                (comment, index) => (
                  <p key={index}>{comment}</p>
                )
              )}
            </div>

          </div>
        </div>
      )}

      <footer className="main-footer">
        <a href="/" className="logo">
          AFRI<span>SCENE</span>
        </a>

        <p>
          African stories. Global experiences.
        </p>

        <p>© {new Date().getFullYear()} AFRISCENE</p>
      </footer>

    </main>
  );
}
