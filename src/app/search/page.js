import Link from 'next/link';

export default function SearchPage() {
    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-start text-white">
     <h1 className="text-4xl mt-6 mb-4">Search Results</h1>


     <div className="flex flex-col items-center w-full overflow-y-auto pb-10">
       <Link href="/video" className="w-1/2 max-w-3xl bg-neutral-700 rounded-2xl p-3 m-3 flex items-start gap-3">
         <img
           src="https://i.ytimg.com/vi/abc123/mqdefault.jpg"
           alt="How to Learn JavaScript Fast"
           width={160}
           height={120}
           className="rounded-md shrink-0 object-fill"
         />
         <div className="flex flex-col justify-start h-full p-3">
           <h2 className="text-lg font-semibold leading-tight mb-1"> How to Learn JavaScript Fast</h2>
           <p className="text-sm text-gray-300 leading-snug">A quick guide to getting started with JavaScript.</p>
         </div>
       </Link>
     </div>
   </div>
    );
}