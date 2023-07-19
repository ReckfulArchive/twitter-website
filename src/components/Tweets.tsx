"use client";

import { getTweets } from "@/api/queries";
import Tweet from "./Tweet";
import { useQuery } from "@tanstack/react-query";

// Home for all 3 tweet tabs

const Tweets = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["getTweets"],
    suspense: true,
    // TODO: make it so as you scroll it pulls more tweets
    queryFn: () => getTweets("byron", 0, 25),
  });
  return (
    <div className="content">
      {!isLoading && data && data.map((t, i) => <Tweet key={i} data={t} />)}
    </div>
  );
};

export default Tweets;
