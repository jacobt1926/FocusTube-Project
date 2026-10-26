import PlaylistVideos from "./PlaylistVideos";

export default async function PlaylistPage({ params }) {
  const { playlistId } = await params;
  return <PlaylistVideos playlistId={playlistId} />;
}
