"use client";

import { useEffect, useState } from "react";

export default function VideoDetails({ videoId }) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadVideo() {
      setLoading(true);
      setError("");
      try {
        const query = new URLSearchParams({ videoId });
        const response = await fetch(`/api/video?${query.toString()}`, { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Video request failed.");
        if (active) setVideo(data.items?.[0] ?? null);
      } catch (requestError) {
        if (active) setError(requestError.message || "Unable to load this video.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadVideo();
    return () => {
      active = false;
    };
  }, [videoId]);

  const title = video?.snippet?.title ?? "Video details";
  const description = video?.snippet?.description ?? "";

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 pb-8 text-white">
      {loading && <p className="mt-10 text-gray-300">Loading video…</p>}
      {error && <p role="alert" className="mt-10 text-red-300">{error}</p>}
      {!loading && !error && !video && <p className="mt-10">No video details were returned.</p>}

      {video && (
        <>
          <h1 className="text-3xl p-2 m-2 text-center">{title}</h1>
          <div className="w-full max-w-5xl aspect-video">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src={`https://www.youtube.com/embed/${encodeURIComponent(videoId)}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="w-full max-w-5xl mt-4 p-4 bg-neutral-800 rounded-lg">
            <p className="text-gray-300 whitespace-pre-wrap">{description || "No description available."}</p>
          </div>
        </>
      )}
    </main>
  );
}
