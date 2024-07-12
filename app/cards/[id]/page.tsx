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
    <div>
        <img src={theCard.data.images.small}></img>
    </div>
  );
}