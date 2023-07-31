"use client";

import { useEffect, useState } from "react";
import Profile from "./Profile";
import Tweets from "./Tweets";
import { useQuery } from "@tanstack/react-query";
import { getProfile, getTweets } from "@/api/queries";
import { Profile as ProfileObj, Tweet, TweetTabObj } from "@/global/interfaces";
import { tabs } from "@/global/data";
import { TweetTab } from "@/global/enums";
import Image from "next/image";
import home from "/public/reply.svg";

interface TwitterContentProps {
  isPageLoaded: boolean;
  profile: string;
}

const TwitterContent: React.FC<TwitterContentProps> = ({
  isPageLoaded,
  profile,
}) => {
  const [activeTab, setActiveTab] = useState<TweetTabObj>(tabs[0]);
  const [tweetPage, setTweetPage] = useState<number>(0);
  const [tweetReplyPage, setTweetReplyPage] = useState<number>(0);
  const [tweetMediaPage, setTweetMediaPage] = useState<number>(0);
  const [tweetDataList, setTweetDataList] = useState<Tweet[]>([]);
  const [tweetReplyDataList, setTweetReplyDataList] = useState<Tweet[]>([]);
  const [tweetMediaDataList, setTweetMediaData] = useState<Tweet[]>([]);

  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ["getProfile"],
    suspense: true,
    staleTime: 30 * (60 * 1000),
    cacheTime: 35 * (60 * 1000),
    enabled: isPageLoaded,
    queryFn: () => getProfile(profile),
  });

  const {
    data: tweetData,
    refetch: tweetRefetch,
    isLoading: isTweetLoading,
  } = useQuery({
    queryKey: ["getTweets"],
    suspense: true,
    staleTime: 30 * (60 * 1000),
    cacheTime: 35 * (60 * 1000),
    enabled: isPageLoaded,
    queryFn: () => getTweets(profile, ["post"], false, tweetPage, 10),
  });
  const {
    data: tweetReplyData,
    refetch: tweetReplyRefetch,
    isLoading: isReplyTweetLoading,
  } = useQuery({
    queryKey: ["getReplyTweets"],
    suspense: true,
    staleTime: 30 * (60 * 1000),
    cacheTime: 35 * (60 * 1000),
    enabled: isPageLoaded,
    queryFn: () =>
      getTweets(profile, ["reply, post"], false, tweetReplyPage, 10),
  });
  const {
    data: tweetMediaData,
    refetch: tweetMediaRefetch,
    isLoading: isMediaTweetLoading,
  } = useQuery({
    queryKey: ["getMediaTweets"],
    suspense: true,
    staleTime: 30 * (60 * 1000),
    cacheTime: 35 * (60 * 1000),
    enabled: isPageLoaded,
    queryFn: () => getTweets(profile, ["post"], true, tweetMediaPage, 10),
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

  return (
    <>
      {!isProfileLoading &&
        !isTweetLoading &&
        !isReplyTweetLoading &&
        !isMediaTweetLoading && (
          <a className="homeButton" href="/">
            <Image
              width="40"
              height="40"
              alt="home image"
              src={home}
            />
            <h5>Home</h5>
          </a>
        )}
      <Profile
        data={profileData as ProfileObj}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Tweets key="content" data={returnData()} setPage={returnPageType()} />
    </>
  );
};

export default TwitterContent;
