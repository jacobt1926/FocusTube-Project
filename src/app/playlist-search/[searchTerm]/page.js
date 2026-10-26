import SearchResults from "../../search/SearchResults";

export default async function PlaylistSearchPage({ params }) {
  const { searchTerm } = await params;
  return <SearchResults searchTerm={searchTerm} type="playlist" />;
}
