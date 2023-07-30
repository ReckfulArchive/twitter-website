"use client";

import { useEffect, useState } from "react";
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
  const [tweetPage, setTweetPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTweetList, setSearchTweetList] = useState<Tweet[]>([]);

  const { data, refetch } = useQuery({
    queryKey: ["getSearchedTweets"],
    staleTime: 30 * (60 * 1000),
    cacheTime: 35 * (60 * 1000),
    enabled: searchTerm != "",
    queryFn: () => getSearchedTweets(profile, searchTerm, tweetPage, 10),
  });

  const search = () => {
    setSearchTweetList([]);
    setTweetPage(0);
    refetch();
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweetPage]);

  useEffect(() => {
    setSearchTweetList((l) => [...l, ...(data || [])]);
  }, [data]);

  return (
    <div>
      <a className="homeButton" href={`/${profile}`}>
        <Image
          width="40"
          height="40"
          alt="home image"
          src={home}
          loading="lazy"
        />
        <h5>Back</h5>
      </a>
      <div className="searchForm">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button onClick={() => search()}>Search</button>
      </div>
      <Tweets key="search" data={searchTweetList} setPage={setTweetPage} />
    </div>
  );
};

export default SearchContent;
