"use client";

import { useEffect, useState } from "react";
import Profile from "./Profile";
import Tweets from "./Tweets";
import { useQuery } from "@tanstack/react-query";
import { getTweets } from "@/api/queries";
import { Tweet, TweetTabObj } from "@/global/interfaces";
import { tabs } from "@/global/data";
import { TweetTab } from "@/global/enums";

const TwitterContent = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TweetTabObj>(tabs[0]);
  const [tweetPage, setTweetPage] = useState<number>(0);
  const [tweetReplyPage, setTweetReplyPage] = useState<number>(0);
  const [tweetMediaPage, setTweetMediaPage] = useState<number>(0);
  const [tweetDataList, setTweetDataList] = useState<Tweet[]>([]);
  const [tweetReplyDataList, setTweetReplyDataList] = useState<Tweet[]>([]);
  const [tweetMediaDataList, setTweetMediaData] = useState<Tweet[]>([]);

  const { data: tweetData, refetch: tweetRefetch } = useQuery({
    queryKey: ["getTweets"],
    suspense: true,
    staleTime: 30 * (60 * 1000),
    cacheTime: 35 * (60 * 1000),
    enabled: isPageLoaded,
    queryFn: () => getTweets("byron", ["post"], false, tweetPage, 10),
  });
  const { data: tweetReplyData, refetch: tweetReplyRefetch } = useQuery({
    queryKey: ["getReplyTweets"],
    suspense: true,
    staleTime: 30 * (60 * 1000),
    cacheTime: 35 * (60 * 1000),
    enabled: isPageLoaded,
    queryFn: () =>
      getTweets("byron", ["reply, post"], false, tweetReplyPage, 10),
  });
  const { data: tweetMediaData, refetch: tweetMediaRefetch } = useQuery({
    queryKey: ["getMediaTweets"],
    suspense: true,
    staleTime: 30 * (60 * 1000),
    cacheTime: 35 * (60 * 1000),
    enabled: isPageLoaded,
    queryFn: () => getTweets("byron", ["post"], true, tweetMediaPage, 10),
  });

  const combineAndSortByDate = (list1: Tweet[], list2: Tweet[]) => {
    return [...list1, ...list2].sort((t1, t2) =>
      new Date(t1.dateSent.iso) > new Date(t2.dateSent.iso)
        ? -1
        : new Date(t1.dateSent.iso) < new Date(t2.dateSent.iso)
        ? 1
        : 0
    );
  };

  const returnData = () => {
    switch (activeTab.type) {
      case TweetTab.TWEETS:
        return tweetDataList;
      case TweetTab.REPLIES:
        return tweetReplyDataList;
      case TweetTab.MEDIA:
        return tweetMediaDataList;
    }
  };

  const returnPageType = () => {
    switch (activeTab.type) {
      case TweetTab.TWEETS:
        return setTweetPage;
      case TweetTab.REPLIES:
        return setTweetReplyPage;
      case TweetTab.MEDIA:
        return setTweetMediaPage;
    }
  };

  useEffect(() => {
    switch (activeTab.type) {
      case TweetTab.TWEETS:
        tweetRefetch();
      case TweetTab.REPLIES:
        tweetReplyRefetch();
      case TweetTab.MEDIA:
        tweetMediaRefetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweetPage, tweetReplyPage, tweetMediaPage]);

  useEffect(() => {
    setTweetDataList((l) => [...l, ...(tweetData || [])]);
  }, [tweetData]);

  useEffect(() => {
    setTweetReplyDataList((l) => combineAndSortByDate(l, tweetReplyData || []));
  }, [tweetReplyData]);

  useEffect(() => {
    setTweetMediaData((l) => [...l, ...(tweetMediaData || [])]);
  }, [tweetMediaData]);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <>
      <Profile
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPageLoaded={isPageLoaded}
      />
      <Tweets data={returnData()} setPage={returnPageType()} />
    </>
  );
};

export default TwitterContent;
