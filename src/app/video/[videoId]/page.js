import VideoDetails from "../VideoDetails";

export default async function VideoPage({ params }) {
  const { videoId } = await params;
  return <VideoDetails videoId={videoId} />;
}
