export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text")?.trim();
  const type = searchParams.get("type");
  const channelId = searchParams.get("channel");
  const apiKey = process.env.API_KEY;

  if (!text) {
    return Response.json({ error: "Search text is required." }, { status: 400 });
  }

  if (type && !["video", "channel", "playlist"].includes(type)) {
    return Response.json({ error: "Type must be video, channel, or playlist." }, { status: 400 });
  }

  if (!apiKey) {
    console.error("API_KEY is not configured.");
    return Response.json({ error: "YouTube API is not configured." }, { status: 500 });
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", text);
  if (type) url.searchParams.set("type", type);
  if (channelId) url.searchParams.set("channelId", channelId);

  if (type === "video") {
    url.searchParams.set("videoDuration", "medium");
  }

  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error("YouTube API Error:", errorText);
      return Response.json({ error: "YouTube search request failed." }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
    } catch (error) {
        console.error("Search route error:", error);
        return Response.json({ error: "Unable to search YouTube." }, { status: 500 });
    }
}
