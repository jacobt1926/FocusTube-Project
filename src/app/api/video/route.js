export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");
  const apiKey = process.env.API_KEY;

  if (!videoId) {
    return Response.json({ error: "A videoId is required." }, { status: 400 });
  }

  if (!apiKey) {
    console.error("API_KEY is not configured.");
    return Response.json({ error: "YouTube API is not configured." }, { status: 500 });
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "snippet,contentDetails,statistics");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error("YouTube API Error:", errorText);
      return Response.json({ error: "Failed to fetch video details." }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Video route error:", error);
    return Response.json({ error: "Unable to fetch video details." }, { status: 500 });
  }
}
