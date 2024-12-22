import SearchResults from "../components/SearchResults";

export default async function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query;
  
  const getCards = async () => {
    if (!query) return { data: [] }; // Return empty data if no query
    
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:"*${query}*"`);
    if (!res.ok) {
      console.error('Failed to fetch search results');
      return { data: [] };
    }
    
    return res.json();
  };

  const data = await getCards();

  return (
    <div>
      <SearchResults data={data} />
    </div>
  );
}
