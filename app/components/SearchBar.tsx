"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import searchPage from "../search/page";

const SearchBar = () => {
  const router = useRouter();
  const suggestionList = ['Search For Cards...', 'Try Searching "Umbreon"', 'Try Searching "Charizard ex"' , 'Try Searching "Ultra Ball"']
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentSuggestionIndex + 1) % suggestionList.length;
      setCurrentSuggestionIndex(nextIndex);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentSuggestionIndex]);
  

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;

    if (query) {
      router.push(`/search?query=${query}`);
      searchPage(query);
    }
  };

  return (
    <form
      className="flex ic justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="query"
        placeholder={suggestionList[currentSuggestionIndex]}
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <Image src="/search.png" alt="" width={24} height={16}></Image>
      </button>
    </form>
  );
};

export default SearchBar;
