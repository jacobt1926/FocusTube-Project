export default function Video() {
   return (
    <div className="h-lvh w-lvw flex flex-col items-center justify-start text-white">
     <iframe
       width="960"
       height="540"
       src="https://www.youtube.com/embed/your-youtube-video-id-here"
       title="YouTube video player"
       frameBorder="0"
       allowFullScreen
       className="rounded-lg shadow-lg"
     ></iframe>
   </div>
   )
}