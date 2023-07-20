"use client";

import Tweet from "./Tweet";

// Home for all 3 tweet tabs

interface TweetsProps {
  data: Tweet[] | undefined;
  refetch: any;
}

const Tweets: React.FC<TweetsProps> = ({ data, refetch }) => {
  return (
    <div className="content">
      {/* <button onClick={refetch}>Refetch</button> */}
      {data && data.map((t, i) => <Tweet key={i} data={t} />)}
    </div>
  );
};

export default Tweets;
