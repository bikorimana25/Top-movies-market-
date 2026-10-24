"use client";

import { useMemo, useState } from "react";

const INITIAL_MOVIES = [
  {
    id: "movie-1",
    title: "African Warriors",
    category: "African Movies",
    year: 2025,
    duration: "2h 05m",
    rating: "8.5",
    description:
      "A community unites to protect its heritage, land, and future. Replace this sample description with details for a film you are authorised to distribute.",
    poster:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&q=80",
    videoUrl: "",
    downloadUrl: "",
    access: "Free",
    price: 0,
  },
  {
    id: "movie-2",
    title: "A Story of Love",
    category: "Romance",
    year: 2025,
    duration: "1h 42m",
    rating: "8.1",
    description:
      "Two people from different worlds discover a connection that changes their lives.",
    poster:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
    videoUrl: "",
    downloadUrl: "",
    access: "Free",
    price: 0,
  },
  {
    id: "movie-3",
    title: "The Great Escape",
    category: "Action",
    year: 2025,
    duration: "1h 55m",
    rating: "8.7",
    description:
      "A daring mission becomes a race against time in this action adventure.",
    poster:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
    videoUrl: "",
    downloadUrl: "",
    access: "Paid",
    price: 1500,
  },
  {
    id: "movie-4",
    title: "Laugh Out Loud",
    category: "Comedy",
    year: 2025,
    duration: "1h 30m",
    rating: "7.9",
    description:
      "Unexpected events turn an ordinary day into a hilarious adventure.",
    poster:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
    videoUrl: "",
    downloadUrl: "",
    access: "Free",
    price: 0,
  },
  {
    id: "movie-5",
    title: "The Hidden Truth",
    category: "Drama",
    year: 2024,
    duration: "1h 50m",
    rating: "8.2",
    description:
      "A family secret forces everyone to face the past and reconsider the future.",
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    videoUrl: "",
    downloadUrl: "",
    access: "Paid",
    price: 2000,
  },
  {
    id: "movie-6",
    title: "Wild Horizons",
    category: "Adventure",
    year: 2025,
    duration: "1h 48m",
    rating: "8.0",
    description:
      "A journey across remarkable landscapes reveals courage, friendship, and hope.",
    poster:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80",
    videoUrl: "",
    downloadUrl: "",
    access: "Free",
    price: 0,
  },
];

const CATEGORIES = [
  "All",
  "African Movies",
  "Action",
  "Romance",
  "Comedy",
  "Drama",
  "Adventure",
];

function money(value) {
  return `${Number(value || 0).toLocaleString()} RWF`;
}

export default function HomePage() {
  const [movies, setMovies] = useState(INITIAL_MOVIES);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [comments, setComments] = useState({});
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentNotice, setCommentNotice] = useState("");
  const [messageName, setMessageName] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageNotice, setMessageNotice] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminTitle, setAdminTitle] = useState("");
  const [adminCategory, setAdminCategory] = useState("African Movies");
  const [adminYear, setAdminYear] = useState("2026");
  const [adminPoster, setAdminPoster] = useState("");
  const [adminVideo, setAdminVideo] = useState("");
  const [adminDownload, setAdminDownload] = useState("");
  const [adminDescription, setAdminDescription] = useState("");
  const [adminAccess, setAdminAccess] = useState("Free");
  const [adminPrice, setAdminPrice] = useState("0");
  const [adminNotice, setAdminNotice] = useState("");

  const selectedMovie =
    movies.find((movie) => movie.id === selectedMovieId) || null;

  const filteredMovies = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return movies.filter((movie) => {
      const categoryMatches =
        selectedCategory === "All" ||
        movie.category === selectedCategory;
      const searchMatches =
        !normalizedSearch ||
        movie.title.toLowerCase().includes(normalizedSearch) ||
        movie.category.toLowerCase().includes(normalizedSearch) ||
        movie.description.toLowerCase().includes(normalizedSearch);
      return categoryMatches && searchMatches;
    });
  }, [movies, selectedCategory, search]);

  const relatedMovies = selectedMovie
    ? movies.filter(
        (movie) =>
          movie.id !== selectedMovie.id &&
          movie.category === selectedMovie.category
      )
    : [];

  function addComment(event) {
    event.preventDefault();
    if (!selectedMovie || !commentName.trim() || !commentText.trim()) return;

    const newComment = {
      id: `${Date.now()}-${Math.random()}`,
      name: commentName.trim(),
      text: commentText.trim(),
      date: new Date().toLocaleDateString(),
    };

    setComments((current) => ({
      ...current,
      [selectedMovie.id]: [
        ...(current[selectedMovie.id] || []),
        newComment,
      ],
    }));
    setCommentName("");
    setCommentText("");
    setCommentNotice(
      "Comment added in this browser session. Database storage is not connected yet."
    );
  }

  function sendMessage(event) {
    event.preventDefault();
    const subject = encodeURIComponent("REBA MOVIES website message");
    const body = encodeURIComponent(
      `Name: ${messageName}\nEmail: ${messageEmail}\n\nMessage:\n${messageText}`
    );

    // Replace this address with your real support email.
    const supportEmail = "YOUR_EMAIL@example.com";
    if (supportEmail === "YOUR_EMAIL@example.com") {
      setMessageNotice(
        "Please replace YOUR_EMAIL@example.com in app/page.js with your real support email before using this form."
      );
      return;
    }

    window.location.href =
      `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    setMessageNotice("Your email application should open with the message.");
  }

  function addMovie(event) {
    event.preventDefault();
    if (!adminTitle.trim() || !adminPoster.trim()) {
      setAdminNotice("Movie title and poster image URL are required.");
      return;
    }

    const newMovie = {
      id: `custom-${Date.now()}`,
      title: adminTitle.trim(),
      category: adminCategory,
      year: Number(adminYear) || 2026,
      duration: "Duration not set",
      rating: "New",
      description: adminDescription.trim() || "Movie description coming soon.",
      poster: adminPoster.trim(),
      videoUrl: adminVideo.trim(),
      downloadUrl: adminDownload.trim(),
      access: adminAccess,
      price: adminAccess === "Paid" ? Math.max(0, Number(adminPrice) || 0) : 0,
    };

    setMovies((current) => [newMovie, ...current]);
    setAdminTitle("");
    setAdminPoster("");
    setAdminVideo("");
    setAdminDownload("");
    setAdminDescription("");
    setAdminPrice("0");
    setAdminNotice(
      "Movie added to this browser session only. Connect a database to publish it permanently for all visitors."
    );
    setSelectedCategory("All");
    setSearch("");
  }

  return (
    <main className="min-h-screen bg-[#080a12] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080a12]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4">
          <button
            type="button"
            onClick={() => {
              setSelectedMovieId(null);
              setShowAdmin(false);
            }}
            className="text-left text-xl font-black tracking-tight sm:text-2xl"
          >
            REBA<span className="text-cyan-400"> MOVIES</span>
            <span className="mt-1 block text-[9px] tracking-[0.35em] text-gray-400">
              AFRICAN CINEMA
            </span>
          </button>
          <nav className="flex items-center gap-2">
            <a
              href="#movies"
              className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-gray-200 hover:border-cyan-400 sm:inline-flex"
            >
              Explore
            </a>
            <button
              type="button"
              onClick={() => {
                setShowAdmin((current) => !current);
                setSelectedMovieId(null);
              }}
              className="rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-bold text-cyan-300 hover:bg-cyan-400 hover:text-black"
            >
              {showAdmin ? "Close Admin" : "Admin Demo"}
            </button>
          </nav>
        </div>
      </header>

      {showAdmin ? (
        <section className="mx-auto max-w-4xl px-4 py-12">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
            Content management preview
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Add a Movie
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-gray-400">
            This is a front-end dashboard demo. It does not have login or
            permanent storage. Do not publish private video URLs here until
            database permissions and protected media access are configured.
          </p>

          <form
            onSubmit={addMovie}
            className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-2"
          >
            <label className="grid gap-2 text-sm text-gray-300">
              Movie title *
              <input
                value={adminTitle}
                onChange={(event) => setAdminTitle(event.target.value)}
                required
                maxLength={120}
                placeholder="Enter movie title"
                className="rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2 text-sm text-gray-300">
              Category
              <select
                value={adminCategory}
                onChange={(event) => setAdminCategory(event.target.value)}
                className="rounded-xl border border-white/10 bg-[#111421] p-3 text-white outline-none focus:border-cyan-400"
              >
                {CATEGORIES.filter((category) => category !== "All").map(
                  (category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  )
                )}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-gray-300">
              Year
              <input
                type="number"
                value={adminYear}
                onChange={(event) => setAdminYear(event.target.value)}
                className="rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2 text-sm text-gray-300">
              Access
              <select
                value={adminAccess}
                onChange={(event) => setAdminAccess(event.target.value)}
                className="rounded-xl border border-white/10 bg-[#111421] p-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </label>

            {adminAccess === "Paid" && (
              <label className="grid gap-2 text-sm text-gray-300">
                Price (RWF)
                <input
                  type="number"
                  min="0"
                  value={adminPrice}
                  onChange={(event) => setAdminPrice(event.target.value)}
                  className="rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-cyan-400"
                />
              </label>
            )}

            <label className="grid gap-2 text-sm text-gray-300 sm:col-span-2">
              Poster image URL *
              <input
                type="url"
                value={adminPoster}
                onChange={(event) => setAdminPoster(event.target.value)}
                required
                placeholder="https://..."
                className="rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2 text-sm text-gray-300 sm:col-span-2">
              Video URL (authorised video only)
              <input
                type="url"
                value={adminVideo}
                onChange={(event) => setAdminVideo(event.target.value)}
                placeholder="https://..."
                className="rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2 text-sm text-gray-300 sm:col-span-2">
              Download URL (optional)
              <input
                type="url"
                value={adminDownload}
                onChange={(event) => setAdminDownload(event.target.value)}
                placeholder="https://..."
                className="rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2 text-sm text-gray-300 sm:col-span-2">
              Description
              <textarea
                value={adminDescription}
                onChange={(event) => setAdminDescription(event.target.value)}
                rows={4}
                maxLength={3000}
                placeholder="Write the movie description..."
                className="rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <button
              type="submit"
              className="rounded-xl bg-cyan-400 px-5 py-3 font-black text-black transition hover:bg-cyan-300 sm:col-span-2"
            >
              Add Movie to Preview
            </button>

            {adminNotice && (
              <p role="status" className="text-sm text-cyan-300 sm:col-span-2">
                {adminNotice}
              </p>
            )}
          </form>
        </section>
      ) : (
        <>
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/50 via-[#080a12]/80 to-purple-950/50" />
            <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 sm:py-24 lg:grid-cols-2">
              <div>
                <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-cyan-300">
                  YOUR WORLD OF AFRICAN CINEMA
                </span>
                <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight sm:text-6xl">
                  Stories That Move You.
                  <span className="block bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                    Cinema Without Limits.
                  </span>
                </h1>
                <p className="mt-5 max-w-xl leading-7 text-gray-400">
                  Discover African films, explore new genres, stream
                  authorised videos, and download movies made available for
                  offline viewing.
                </p>
                <a
                  href="#movies"
                  className="mt-8 inline-flex rounded-xl bg-cyan-400 px-6 py-3 font-black text-black transition hover:bg-cyan-300"
                >
                  Explore Movies →
                </a>
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#151827] shadow-2xl">
                <img
                  src={movies[0]?.poster}
                  alt="Featured movie artwork"
                  className="h-72 w-full object-cover sm:h-96"
                />
                <div className="p-6">
                  <p className="text-xs font-bold tracking-widest text-cyan-300">
                    FEATURED CINEMA
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    Discover African Stories
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    New adventures. New emotions. New worlds.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="movies" className="mx-auto max-w-7xl px-4 py-12">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
                  Movie collection
                </p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  Explore Movies
                </h2>
              </div>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search movies..."
                aria-label="Search movies"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-400 sm:max-w-xs"
              />
            </div>

            <div className="mt-7 flex gap-2 overflow-x-auto pb-3">
              {CATEGORIES.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                    selectedCategory === category
                      ? "bg-cyan-400 text-black"
                      : "border border-white/10 bg-white/5 text-gray-300 hover:border-cyan-400/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredMovies.map((movie) => (
                <button
                  type="button"
                  key={movie.id}
                  onClick={() => {
                    setSelectedMovieId(movie.id);
                    setCommentNotice("");
                  }}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111421] text-left transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      loading="lazy"
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />
                    <span className="absolute left-2 top-2 rounded-lg bg-black/80 px-2 py-1 text-xs font-bold text-cyan-300">
                      {movie.access === "Free" ? "FREE" : money(movie.price)}
                    </span>
                    <span className="absolute bottom-2 right-2 rounded-lg bg-black/80 px-2 py-1 text-xs">
                      ★ {movie.rating}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="truncate font-bold">{movie.title}</h3>
                    <p className="mt-1 text-xs text-gray-400">
                      {movie.category} · {movie.year}
                    </p>
                    <p className="mt-3 text-sm font-bold text-cyan-300">
                      View details →
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {filteredMovies.length === 0 && (
              <p className="py-12 text-center text-gray-400">
                No movies found. Try another search.
              </p>
            )}
          </section>

          {selectedMovie && (
            <section className="border-y border-white/10 bg-[#101321]">
              <div className="mx-auto max-w-7xl px-4 py-10">
                <button
                  type="button"
                  onClick={() => setSelectedMovieId(null)}
                  className="mb-6 rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-cyan-400"
                >
                  ← Back to movies
                </button>

                <div className="grid gap-7 md:grid-cols-[260px_1fr]">
                  <img
                    src={selectedMovie.poster}
                    alt={selectedMovie.title}
                    className="max-h-[420px] w-full rounded-2xl object-cover"
                  />
                  <div>
                    <p className="font-bold uppercase tracking-widest text-cyan-400">
                      {selectedMovie.category}
                    </p>
                    <h2 className="mt-3 text-3xl font-black sm:text-5xl">
                      {selectedMovie.title}
                    </h2>
                    <p className="mt-3 text-sm text-gray-400">
                      {selectedMovie.year} · {selectedMovie.duration} · ★{" "}
                      {selectedMovie.rating}
                    </p>
                    <p className="mt-6 max-w-2xl leading-7 text-gray-300">
                      {selectedMovie.description}
                    </p>
                    <p className="mt-5 font-bold">
                      {selectedMovie.access === "Free"
                        ? "Free movie"
                        : `Price: ${money(selectedMovie.price)}`}
                    </p>

                    {selectedMovie.videoUrl ? (
                      <div className="mt-6 flex flex-wrap gap-3">
                        <a
                          href={selectedMovie.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-black"
                        >
                          ▶ Watch Movie
                        </a>
                        {selectedMovie.downloadUrl && (
                          <a
                            href={selectedMovie.downloadUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-cyan-400 px-5 py-3 font-bold text-cyan-300"
                          >
                            ↓ Download
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/5 p-4 text-sm leading-6 text-amber-200">
                        Video is not connected yet. Add a valid video URL in
                        the admin preview. Paid access, payment verification,
                        and protected downloads must be implemented on the
                        server before selling premium movies.
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-12">
                  <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
                    You may also like
                  </p>
                  <h3 className="mt-2 text-2xl font-black">
                    More {selectedMovie.category} Movies
                  </h3>
                  {relatedMovies.length ? (
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {relatedMovies.map((movie) => (
                        <button
                          type="button"
                          key={movie.id}
                          onClick={() => {
                            setSelectedMovieId(movie.id);
                            setCommentNotice("");
                          }}
                          className="overflow-hidden rounded-xl border border-white/10 bg-[#080a12] text-left transition hover:border-cyan-400"
                        >
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            loading="lazy"
                            className="h-48 w-full object-cover"
                          />
                          <div className="p-3">
                            <p className="font-bold">{movie.title}</p>
                            <p className="mt-1 text-xs text-gray-400">
                              {movie.category}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-gray-400">
                      More movies in this category will appear here when added.
                    </p>
                  )}
                </div>

                <div className="mt-12 border-t border-white/10 pt-8">
                  <h3 className="text-2xl font-black">Comments & Reviews</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Share your thoughts about this movie.
                  </p>
                  <form onSubmit={addComment} className="mt-6 grid gap-3">
                    <input
                      value={commentName}
                      onChange={(event) => setCommentName(event.target.value)}
                      placeholder="Your name"
                      maxLength={60}
                      required
                      className="rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-cyan-400"
                    />
                    <textarea
                      value={commentText}
                      onChange={(event) => setCommentText(event.target.value)}
                      placeholder="Write your comment..."
                      maxLength={1000}
                      rows={4}
                      required
                      className="rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-cyan-400"
                    />
                    <button
                      type="submit"
                      className="w-fit rounded-xl bg-cyan-400 px-5 py-3 font-bold text-black"
                    >
                      Post Comment
                    </button>
                  </form>
                  {commentNotice && (
                    <p role="status" className="mt-3 text-sm text-cyan-300">
                      {commentNotice}
                    </p>
                  )}
                  <div className="mt-6 grid gap-3">
                    {(comments[selectedMovie.id] || []).map((comment) => (
                      <article
                        key={comment.id}
                        className="rounded-xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-bold text-cyan-300">
                            {comment.name}
                          </p>
                          <time className="text-xs text-gray-500">
                            {comment.date}
                          </time>
                        </div>
                        <p className="mt-2 whitespace-pre-wrap text-gray-300">
                          {comment.text}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          <section id="contact" className="mx-auto max-w-3xl px-4 py-14">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
              Contact REBA MOVIES
            </p>
            <h2 className="mt-2 text-3xl font-black">Send Us a Message</h2>
            <p className="mt-3 text-gray-400">
              Questions, feedback, partnership ideas, or movie requests? Send
              us a message.
            </p>
            <form onSubmit={sendMessage} className="mt-6 grid gap-4">
              <input
                value={messageName}
                onChange={(event) => setMessageName(event.target.value)}
                placeholder="Your name"
                maxLength={100}
                required
                className="rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-cyan-400"
              />
              <input
                type="email"
                value={messageEmail}
                onChange={(event) => setMessageEmail(event.target.value)}
                placeholder="Your email"
                maxLength={254}
                required
                className="rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-cyan-400"
              />
              <textarea
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                placeholder="Write your message..."
                rows={5}
                maxLength={3000}
                required
                className="rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-black"
              >
                Send Message
              </button>
            </form>
            {messageNotice && (
              <p role="status" className="mt-3 text-sm text-amber-200">
                {messageNotice}
              </p>
            )}
            <p className="mt-3 text-xs text-gray-500">
              Configure your support email in app/page.js before enabling
              email sending. A database-backed contact inbox is recommended
              for the production site.
            </p>
          </section>
        </>
      )}

      <footer className="border-t border-white/10 px-4 py-8 text-center">
        <p className="text-lg font-black">
          REBA<span className="text-cyan-400"> MOVIES</span>
        </p>
        <p className="mt-2 text-sm text-gray-500">
          African cinema. Stories for everyone.
        </p>
        <p className="mt-4 text-xs text-gray-600">
          Only stream or download films you have permission to distribute.
        </p>
      </footer>
    </main>
  );
}
