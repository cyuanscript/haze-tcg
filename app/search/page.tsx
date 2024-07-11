import SearchResults from "../components/SearchResults";

export default async function searchPage(q: any) {
  const query = q.searchParams?.query;
  const getCards = async () => {
    const res = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=name:"*${query}*"`
    );
    return res.json();
  };

  const data = await getCards();

  return (
    <div>
      <SearchResults data={data}/>
    </div>
  );
}
