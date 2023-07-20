"use client";

import { useState } from "react";
import Profile from "./Profile";
import Tweets from "./Tweets";
import { useQuery } from "@tanstack/react-query";
import { getTweets } from "@/api/queries";
import { Tweet } from "@/global/interfaces";

const tabs = ["Tweets", "Tweets & Replies", "Media"];

const TwitterContent = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data: tweetData, refetch: tweetRefetch } = useQuery({
    queryKey: ["getTweets"],
    suspense: true,
    staleTime: Infinity,
    cacheTime: Infinity,
    // TODO: make it so as you scroll it pulls more tweets
    queryFn: () => getTweets("byron", "post", false, 0, 25),
  });
  const { data: tweetReplyData, refetch: tweetReplyRefetch } = useQuery({
    queryKey: ["getReplyTweets"],
    suspense: true,
    staleTime: Infinity,
    cacheTime: Infinity,
    // TODO: make it so as you scroll it pulls more tweets
    queryFn: () => getTweets("byron", "reply", false, 0, 25),
  });
  const { data: tweetMediaData, refetch: tweetMediaRefetch } = useQuery({
    queryKey: ["getMediaTweets"],
    suspense: true,
    staleTime: Infinity,
    cacheTime: Infinity,
    // TODO: make it so as you scroll it pulls more tweets
    queryFn: () => getTweets("byron", "post", true, 0, 25),
  });

  // TODO: Hacky way for now just to get the loading working to test / fix refetch issues

  const returnData = () => {
    const test = new Date("2020-07-02T12:25:55");
    const test2 = new Date("2020-05-20T14:50:01");
    console.log(test);
    console.log(test2);
    console.log(test > test2);
    if (activeTab === tabs[0]) return tweetData;
    else if (activeTab === tabs[1])
      return [...(tweetReplyData as Tweet[]), ...(tweetData as Tweet[])].sort(
        (t1, t2) =>
          new Date(t1.dateSent.iso) > new Date(t2.dateSent.iso)
            ? -1
            : new Date(t1.dateSent.iso) < new Date(t2.dateSent.iso)
            ? 1
            : 0
      );
    else if (activeTab === tabs[2]) return tweetMediaData;
  };
  const returnRefetch = () => {
    if (activeTab === tabs[0]) return tweetRefetch;
    else if (activeTab === tabs[1]) return tweetReplyRefetch;
    else if (activeTab === tabs[2]) return tweetMediaRefetch;
  };

  return (
    <>
      <Profile activeTab={activeTab} setActiveTab={setActiveTab} />
      <Tweets data={returnData()} refetch={returnRefetch()} />
    </>
  );
};

export default TwitterContent;
