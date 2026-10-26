"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchResults({ searchTerm, type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadResults() {
      setLoading(true);
      setError("");
      try {
        const query = new URLSearchParams({ text: searchTerm, type });
        const response = await fetch(`/api/search?${query.toString()}`, { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Search failed.");
        if (active) setItems(data.items ?? []);
      } catch (requestError) {
        if (active) setError(requestError.message || "Unable to load search results.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadResults();
    return () => {
      active = false;
    };
  }, [searchTerm, type]);

  const isPlaylistSearch = type === "playlist";
  const heading = isPlaylistSearch ? "Playlist Search Results" : "Search Results";

  // Ignore channel or malformed results returned by video searches.
  // The API also requests medium-length videos, which excludes Shorts.
  const visibleItems = isPlaylistSearch
    ? items.filter((item) => Boolean(item.id?.playlistId))
    : items.filter((item) => item.id?.kind === "youtube#video" && Boolean(item.id?.videoId));

  return (
    <main className="min-h-screen w-full px-4 pb-10 text-white">
      <h1 className="text-4xl mt-6 mb-2 text-center">{heading}</h1>
      <p className="text-center text-gray-400 mb-5">Results for “{searchTerm}”</p>

      {loading && <p className="text-center text-gray-300">Loading results…</p>}
      {error && <p role="alert" className="text-center text-red-300">{error}</p>}
      {!loading && !error && visibleItems.length === 0 && (
        <p className="text-center text-gray-300">No results found.</p>
      )}

      <div className="flex flex-col items-center w-full gap-3">
        {visibleItems.map((item, index) => {
          const id = isPlaylistSearch ? item.id?.playlistId : item.id?.videoId;
          const href = id
            ? isPlaylistSearch
              ? `/playlist/${encodeURIComponent(id)}`
              : `/video/${encodeURIComponent(id)}`
            : null;
          const title = item.snippet?.title ?? "Untitled result";
          const thumbnail = item.snippet?.thumbnails?.medium?.url;
          const card = (
            <div className="w-full max-w-3xl bg-neutral-800 rounded-2xl p-3 flex items-start gap-3">
              {thumbnail ? (
                <Image src={thumbnail} alt="" width={160} height={120} className="rounded-md shrink-0 object-cover" />
              ) : (
                <div aria-hidden="true" className="w-40 h-[120px] rounded-md shrink-0 bg-neutral-700" />
              )}
              <div className="min-w-0 p-2">
                <h2 className="text-lg font-semibold leading-tight mb-1">{title}</h2>
                {item.snippet?.channelTitle && <p className="text-xs text-gray-400 mb-1">{item.snippet.channelTitle}</p>}
                <p className="text-sm text-gray-300 leading-snug line-clamp-3">{item.snippet?.description}</p>
              </div>
            </div>
          );

          return href ? (
            <Link href={href} key={id} className="w-full max-w-3xl hover:scale-[1.01] transition-transform">
              {card}
            </Link>
          ) : (
            <div key={`${item.id?.kind ?? "result"}-${index}`} className="w-full max-w-3xl">{card}</div>
          );
        })}
      </div>
    </main>
  );
}


