"use client";

import { useState } from "react";

const movies = [
  {
    id: 1,
    title: "The African Kingdom",
    category: "Action",
    year: 2025,
    language: "English",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700",
    description:
      "Discover an unforgettable African adventure filled with courage, mystery and destiny.",
  },
  {
    id: 2,
    title: "Love Beyond Borders",
    category: "Romance",
    year: 2025,
    language: "French",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=700",
    description:
      "A beautiful story about love, family and the choices that change our lives.",
  },
  {
    id: 3,
    title: "The Last Mission",
    category: "Action",
    year: 2024,
    language: "English",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=700",
    description:
      "An intense cinematic journey where every decision has a consequence.",
  },
  {
    id: 4,
    title: "African Stories",
    category: "Drama",
    year: 2025,
    language: "Kinyarwanda",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=700",
    description:
      "Experience powerful stories inspired by African culture and everyday life.",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const categories = ["All", "Action", "Romance", "Drama"];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || movie.category === category;

    return matchesSearch && matchesCategory;
  });

  function submitComment(event) {
    event.preventDefault();

    if (!comment.trim()) {
      setMessage("Please write a message first.");
      return;
    }

    setComments((previous) => [
      ...previous,
      {
        id: Date.now(),
        text: comment.trim(),
      },
    ]);

    setComment("");
    setMessage("Your message has been added.");
  }

  return (
    <main className="site">
      <header className="navbar">
        <a className="brand" href="#">
          <span className="brand-icon">▶</span>
          REBA <span>MOVIES</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="nav-button" href="#movies">
          Explore Films
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow">YOUR HOME FOR AFRICAN CINEMA</span>

          <h1>
            Great Stories.
            <br />
            <span>One Destination.</span>
          </h1>

          <p>
            Discover African movies, inspiring stories and unforgettable
            entertainment — all in one place.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#movies">
              Explore Movies <span>→</span>
            </a>

            <a className="secondary-button" href="#about">
              Discover REBA
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>AFRICA</strong>
              <span>Stories and culture</span>
            </div>

            <div>
              <strong>HD READY</strong>
              <span>Quality entertainment</span>
            </div>

            <div>
              <strong>ANYTIME</strong>
              <span>Watch at your pace</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-poster">
            <img
              src={movies[0].image}
              alt="Cinema experience"
            />
            <div className="poster-overlay">
              <span>FEATURED COLLECTION</span>
              <h2>A World of Stories</h2>
              <p>Discover your next favourite film.</p>
            </div>
          </div>

          <div className="floating-tag">🎬 African Cinema</div>
        </div>
      </section>

      <section className="movies-section" id="movies">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE COLLECTION</span>
            <h2>Explore Movies</h2>
            <p>Find stories that inspire, entertain and connect us.</p>
          </div>

          <div className="movie-count">
            {filteredMovies.length} films
          </div>
        </div>

        <div className="movie-tools">
          <div className="search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search for a movie..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item ? "category active" : "category"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <article className="movie-card" key={movie.id}>
              <button
                className="poster-button"
                onClick={() => setSelectedMovie(movie)}
                aria-label={`View ${movie.title}`}
              >
                <img src={movie.image} alt={movie.title} />

                <span className="play-button">▶</span>

                <span className="movie-category">
                  {movie.category}
                </span>
              </button>

              <div className="movie-info">
                <div className="movie-meta">
                  <span>{movie.year}</span>
                  <span>{movie.language}</span>
                </div>

                <h3>{movie.title}</h3>

                <p>{movie.description}</p>

                <div className="movie-bottom">
                  <strong>
                    {movie.price.toLocaleString()} RWF
                  </strong>

                  <button
                    className="details-button"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    Details →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="empty-state">
            <span>🎬</span>
            <h3>No movies found</h3>
            <p>Try another title or category.</p>
          </div>
        )}
      </section>

      <section className="about-section" id="about">
        <div className="about-icon">▶</div>

        <div>
          <span className="eyebrow">WELCOME TO REBA MOVIES</span>
          <h2>African stories deserve a global audience.</h2>
          <p>
            REBA MOVIES is designed to connect audiences with films from
            Africa and beyond. Our goal is to make discovering stories
            simple, enjoyable and accessible.
          </p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-heading">
          <div>
            <span className="eyebrow">GET IN TOUCH</span>
            <h2>Send Us a Message</h2>
            <p>Share feedback, ask a question or suggest a film.</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={submitComment}>
          <label htmlFor="message">Your message</label>

          <textarea
            id="message"
            rows={4}
            placeholder="Write your message here..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />

          <button className="primary-button" type="submit">
            Submit Message →
          </button>

          {message && <p className="form-message">{message}</p>}
        </form>

        {comments.length > 0 && (
          <div className="comments-list">
            <h3>Messages in this session</h3>

            {comments.map((item) => (
              <p className="comment-item" key={item.id}>
                {item.text}
              </p>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-icon">▶</span>
          REBA <span>MOVIES</span>
        </a>

        <p>Stories connect us. Cinema brings us together.</p>

        <span>© {new Date().getFullYear()} REBA MOVIES</span>
      </footer>

      {selectedMovie && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="movie-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedMovie(null)}
              aria-label="Close movie details"
            >
              ×
            </button>

            <img
              className="modal-image"
              src={selectedMovie.image}
              alt={selectedMovie.title}
            />

            <div className="modal-content">
              <span className="eyebrow">
                {selectedMovie.category} · {selectedMovie.year}
              </span>

              <h2>{selectedMovie.title}</h2>

              <p>{selectedMovie.description}</p>

              <p>Language: {selectedMovie.language}</p>

              <strong className="modal-price">
                {selectedMovie.price.toLocaleString()} RWF
              </strong>

              <p className="payment-note">
                Online viewing and payments will be connected after the
                film library and payment system are configured.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
