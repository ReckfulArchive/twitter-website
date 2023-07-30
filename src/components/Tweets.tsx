"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Tweet from "./Tweet";

interface TweetsProps {
  data: Tweet[];
  setPage: Dispatch<SetStateAction<number>>;
}

const Tweets: React.FC<TweetsProps> = ({ data, setPage }) => {
  const [end, inView] = useInView();

  useEffect(() => {
    inView && setPage((p) => p + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="content">
      {data.map((t, i) => <Tweet key={i} data={t} />)}
      <div ref={end} />
    </div>
  );
};

export default Tweets;
