import Link from 'next/link';

export default function PlayListPage() {
    return (
        <div>
            <h1>Your Playlist</h1>
            <div>
                <Link href="/video">
                    <img
                        src="https://i.pinimg.com/736x/19/f0/70/19f070deb9fe00aa43f754013d13d01b.jpg"
                        alt="Thing"
                        width={160}
                        height={120}
                    />
                </Link>
                <h2>Video Thing</h2>
            </div>
        </div>
    );
}