export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get("playlistId");
  const apiKey = process.env.API_KEY;

  if (!playlistId) {
    return Response.json({ error: "A playlistId is required." }, { status: 400 });
  }

  if (!apiKey) {
    console.error("API_KEY is not configured.");
    return Response.json({ error: "YouTube API is not configured." }, { status: 500 });
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("maxResults", "50");
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error("YouTube API Error:", errorText);
      return Response.json({ error: "Failed to fetch playlist items." }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Playlist route error:", error);
    return Response.json({ error: "Unable to fetch playlist items." }, { status: 500 });
  }
}
