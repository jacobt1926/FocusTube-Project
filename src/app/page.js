"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [text, setText] = useState("");
  const router = useRouter();

  const search = (type) => {
    const query = text.trim();
    if (query) {
      const path = type === "playlist" ? "/playlist-search" : "/search";
      router.push(`${path}/${encodeURIComponent(query)}`);
    }
  };

  const openPlaylist = () => {
    const playlistId = text.trim();
    if (playlistId) {
      router.push(`/playlist/${encodeURIComponent(playlistId)}`);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 text-white">
      <div className="flex m-3 p-3" aria-label="FocusTube">
        <h1 className="italic text-4xl">Focus</h1>
        <span className="bg-red-800 rounded-lg px-2 text-4xl">Tube</span>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          search("video");
        }}
        className="mt-6 w-full max-w-2xl flex gap-2"
      >
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          type="search"
          className="bg-neutral-700 text-white px-4 py-3 rounded-full w-full text-lg outline-none focus:ring-2 focus:ring-red-800"
          placeholder="Search for something..."
          aria-label="Search YouTube or enter an ID"
        />
        <button
          type="submit"
          className="bg-red-800 text-white px-6 py-2 rounded-full text-lg hover:bg-red-700 active:bg-red-900 transition-colors duration-150"
        >
          Search Videos
        </button>
      </form>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={() => search("playlist")}
          className="bg-neutral-600 text-white px-4 py-2 rounded-2xl hover:bg-neutral-500 active:bg-neutral-700 transition"
        >
          Search Playlists
        </button>
        <button
          type="button"
          onClick={openPlaylist}
          className="bg-neutral-600 text-white px-4 py-2 rounded-2xl hover:bg-neutral-500 active:bg-neutral-700 transition"
        >
          Open Playlist ID
        </button>
        <button
          type="button"
          onClick={() => {
            const videoId = text.trim();
            if (videoId) router.push(`/video/${encodeURIComponent(videoId)}`);
          }}
          className="bg-neutral-600 text-white px-4 py-2 rounded-2xl hover:bg-neutral-500 active:bg-neutral-700 transition"
        >
          Open Video ID
        </button>
      </div>
    </main>
  );
}


