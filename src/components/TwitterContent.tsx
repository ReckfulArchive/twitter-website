"use client";

import { useEffect, useState } from "react";
import Profile from "./Profile";
import Tweets from "./Tweets";
import { useQuery } from "@tanstack/react-query";
import { getTweets } from "@/api/queries";
import { Tweet } from "@/global/interfaces";

const tabs = ["Tweets", "Tweets & Replies", "Media"];

const TwitterContent = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [page, setPage] = useState(0);
  const [tweetDataList, setTweetDataList] = useState<Tweet[]>([]);
  const [tweetReplyDataList, setTweetReplyDataList] = useState<Tweet[]>([]);
  const [tweetMediaDataList, setTweetMediaData] = useState<Tweet[]>([]);

  const { data: tweetData, refetch: tweetRefetch } = useQuery({
    queryKey: ["getTweets"],
    suspense: true,
    staleTime: Infinity,
    cacheTime: Infinity,
    queryFn: () => getTweets("byron", ["post"], false, page, 10),
  });
  const { data: tweetReplyData, refetch: tweetReplyRefetch } = useQuery({
    queryKey: ["getReplyTweets"],
    suspense: true,
    staleTime: Infinity,
    cacheTime: Infinity,
    queryFn: () => getTweets("byron", ["reply, post"], false, page, 10),
  });
  const { data: tweetMediaData, refetch: tweetMediaRefetch } = useQuery({
    queryKey: ["getMediaTweets"],
    suspense: true,
    staleTime: Infinity,
    cacheTime: Infinity,
    queryFn: () => getTweets("byron", ["post"], true, page, 10),
  });

  const returnData = () => {
    if (activeTab === tabs[0]) return tweetDataList;
    else if (activeTab === tabs[1]) return tweetReplyDataList;
    else if (activeTab === tabs[2]) return tweetMediaDataList;
  };

  const combineAndSortByDate = (list1: Tweet[], list2: Tweet[]) => {
    return [...list1, ...list2].sort((t1, t2) =>
      new Date(t1.dateSent.iso) > new Date(t2.dateSent.iso)
        ? -1
        : new Date(t1.dateSent.iso) < new Date(t2.dateSent.iso)
        ? 1
        : 0
    );
  };

  useEffect(() => {
    if (page !== 0) {
      if (activeTab === tabs[0]) {
        tweetRefetch();
      } else if (activeTab === tabs[1]) {
        tweetReplyRefetch();
      } else if (activeTab === tabs[2]) {
        tweetMediaRefetch();
      }
    }
  }, [page]);

  useEffect(() => {
    setTweetDataList((l) => [...l, ...(tweetData as Tweet[])]);
  }, [tweetData]);

  useEffect(() => {
    setTweetReplyDataList((l) =>
      combineAndSortByDate(l, tweetReplyData as Tweet[])
    );
  }, [tweetReplyData]);

  useEffect(() => {
    setTweetMediaData((l) => [...l, ...(tweetMediaData as Tweet[])]);
  }, [tweetMediaData]);

  return (
    <>
      <Profile activeTab={activeTab} setActiveTab={setActiveTab} />
      <Tweets data={returnData()} setPage={setPage} />
    </>
  );
};

export default TwitterContent;
