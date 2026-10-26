"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function PlaylistVideos({ playlistId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPlaylist() {
      setLoading(true);
      setError("");
      try {
        const query = new URLSearchParams({ playlistId });
        const response = await fetch(`/api/playlist?${query.toString()}`, { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Playlist request failed.");
        if (active) setItems(data.items ?? []);
      } catch (requestError) {
        if (active) setError(requestError.message || "Unable to load this playlist.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPlaylist();
    return () => {
      active = false;
    };
  }, [playlistId]);

  return (
    <main className="min-h-screen w-full px-4 pb-10 text-white">
      <h1 className="text-4xl mt-6 mb-5 text-center">Playlist Videos</h1>
      {loading && <p className="text-center text-gray-300">Loading playlist…</p>}
      {error && <p role="alert" className="text-center text-red-300">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="text-center text-gray-300">This playlist has no videos to show.</p>}

      <div className="flex flex-col items-center w-full gap-3">
        {items.map((item, index) => {
          const videoId = item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId;
          if (!videoId) return null;
          const title = item.snippet?.title ?? "Untitled video";
          const thumbnail = item.snippet?.thumbnails?.medium?.url;
          return (
            <a
              href={`/video/${encodeURIComponent(videoId)}`}
              key={videoId || index}
              className="w-full max-w-3xl bg-neutral-800 rounded-2xl p-3 flex items-start gap-3 hover:scale-[1.01] transition-transform"
            >
              {thumbnail ? (
                <Image src={thumbnail} alt="" width={160} height={120} className="rounded-md shrink-0 object-cover" />
              ) : (
                <div aria-hidden="true" className="w-40 h-[120px] rounded-md shrink-0 bg-neutral-700" />
              )}
              <div className="min-w-0 p-2">
                <h2 className="text-lg font-semibold leading-tight mb-1">{title}</h2>
                <p className="text-sm text-gray-300 leading-snug line-clamp-3">{item.snippet?.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </main>
  );
}


