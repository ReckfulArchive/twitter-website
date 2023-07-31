"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import Tweets from "./Tweets";
import "../styles/search.css";
import { useQuery } from "@tanstack/react-query";
import { getSearchedTweets } from "@/api/queries";
import Image from "next/image";
import home from "/public/reply.svg";
import Tweet from "./Tweet";

interface TwitterContentProps {
  profile: string;
}

const SearchContent: React.FC<TwitterContentProps> = ({ profile }) => {
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [tweetPage, setTweetPage] = useState<number>(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTweetList, setSearchTweetList] = useState<Tweet[]>([]);

  const { data, refetch } = useQuery({
    suspense: true,
    queryKey: ["getSearchedTweets"],
    staleTime: 30 * (60 * 1000),
    cacheTime: 35 * (60 * 1000),
    enabled: false,
    queryFn: () => getSearchedTweets(profile, searchTerm, tweetPage, 10),
  });

  const search = () => {
    // Make sure you don't clear the list of combined page tweets if the search term hasn't changed!
    if (searchInput != searchTerm) {
      setSearchTweetList([]);
      setTweetPage(0);
      setSearchTerm(searchInput);
    }
  };

  const handleEnter = (e: KeyboardEvent) => {
    // Enter key code
    if (e.keyCode === 13) {
      search();
    }
  };

  useEffect(() => {
    if (isFirstLoad) setFirstLoad(false);
    else refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweetPage, searchTerm]);

  useEffect(() => {
    setSearchTweetList((l) => [...l, ...(data || [])]);
  }, [data]);

  return (
    <div>
      <a className="homeButton" href={`/${profile}`}>
        <Image width="40" height="40" alt="home image" src={home} />
        <h5>Back</h5>
      </a>
      <div className="searchForm">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyUp={handleEnter}
          value={searchInput}
        />
        <button onClick={() => search()}>Search</button>
      </div>
      {searchTweetList.length ? (
        <Tweets key="search" data={searchTweetList} setPage={setTweetPage} />
      ) : (
        <p className="errorLabel">No Results Returned</p>
      )}
    </div>
  );
};

export default SearchContent;
