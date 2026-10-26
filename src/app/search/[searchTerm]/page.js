import SearchResults from "../SearchResults";

export default async function SearchPage({ params }) {
  const { searchTerm } = await params;
  return <SearchResults searchTerm={searchTerm} type="video" />;
}
