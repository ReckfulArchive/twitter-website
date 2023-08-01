"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import Tweets from "./Tweets";
import "../styles/search.css";
import { useQuery } from "@tanstack/react-query";
import { getSearchedTweets } from "@/api/queries";
import Image from "next/image";
import home from "/public/reply.svg";
import Tweet from "./Tweet";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { SearchParams } from "@/global/interfaces";
import { Oval } from "react-loader-spinner";

interface TwitterContentProps {
  profile: string;
}

const SearchContent: React.FC<TwitterContentProps> = ({ profile }) => {
  const separatorRef = useRef<HTMLDivElement>(null);
  const seachTermInputRef = useRef<HTMLInputElement>(null);
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [tweetPage, setTweetPage] = useState<number>(0);
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date("2010-01-02"));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [searchTweetList, setSearchTweetList] = useState<Tweet[]>([]);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    suspense: true,
    queryKey: ["getSearchedTweets"],
    staleTime: 30 * (60 * 1000),
    cacheTime: 35 * (60 * 1000),
    enabled: false,
    queryFn: () => getSearchedTweets(profile, searchParams, tweetPage, 10),
  });

  // Flow is as follows;
  // if any search field changes, trigger a refresh of Search params
  // Search Params changing triggers a r
  const search = () => {
    // Make sure you don't clear the list of combined page tweets if the search term hasn't changed!
    // This check makes sure it only resets when you are changing the search term or changing a date when start and end exists
    if (
      searchInput != searchParams.term ||
      ((startDate != searchParams.startDate ||
        endDate != searchParams.endDate) &&
        startDate &&
        endDate)
    ) {
      setTweetPage(0);
      setSearchParams({ isfresh: true, term: searchInput, startDate, endDate });
    }
  };

  const handleEnter = (e: KeyboardEvent) => {
    // Enter key code
    if (e.keyCode === 13) search();
    // Escape key code
    else if (e.keyCode === 27) seachTermInputRef.current?.select();
  };

  useEffect(() => {
    if (isFirstLoad) setFirstLoad(false);
    else refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tweetPage,
    searchParams.term,
    searchParams.startDate,
    searchParams.endDate,
  ]);

  useEffect(() => {
    if (searchParams.isfresh) {
      setSearchTweetList([]);
      setSearchParams((p) => ({ ...p, isfresh: false }));
      separatorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    setSearchTweetList((l) => [...l, ...(data || [])]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <div className="searchForm">
        <a className="homeButton" href={`/${profile}`}>
          <Image width="40" height="40" alt="home image" src={home} />
        </a>
        <div>
          <input
            className="searchTermInput"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyUp={handleEnter}
            value={searchInput}
            ref={seachTermInputRef}
            placeholder="Search Archive"
          />
          <button className="searchButton" onClick={() => search()}>
            Search
          </button>
        </div>
        <div>
          <div>
            <h5 className="searchDateLabel">From</h5>
            <DatePicker
              className="searchDatePicker"
              selected={startDate}
              onChange={(date) => setStartDate(date as Date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div>
            <h5 className="searchDateLabel">To</h5>
            <DatePicker
              className="searchDatePicker"
              selected={endDate}
              onChange={(date) => setEndDate(date as Date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
        </div>
      </div>
      <div className="searchSeparator" ref={separatorRef} />
      {(data && data.length) || searchTweetList.length ? (
        isRefetching && tweetPage == 0 ? (
          <Oval
            ariaLabel="loading-indicator"
            height={100}
            width={100}
            strokeWidth={3}
            strokeWidthSecondary={2}
            color="white"
            secondaryColor="gray"
            wrapperClass="loader"
          />
        ) : (
          <Tweets key="search" data={searchTweetList} setPage={setTweetPage} />
        )
      ) : (
        !isLoading && <p className="errorLabel">No Results Returned</p>
      )}
    </div>
  );
};

export default SearchContent;
