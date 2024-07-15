interface getIdParams {
    id?: string
    params?: any
    large?: any
}

export default async function cardPage(params: getIdParams) {
    const id = params.params.id
    const getCard = async () => {
        const res = await fetch(
          `https://api.pokemontcg.io/v2/cards/${id}`
        );
        return res.json();
      };

      const theCard = await getCard();

  return (
    <div className="flex my-20 mx-64 items-center justify-between">
      <div className="">
        <img className="transition ease-in-out delay-150 hover:scale-105 hover:shadow-xl rounded-md shadow-md" src={theCard.data.images.large} width={350}></img>
        <img className="w-32" src={theCard.data.set.images.logo}></img>
      </div>
      <div>box</div>
    </div>
  );
}