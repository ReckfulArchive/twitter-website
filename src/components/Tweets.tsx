import { tweetJson } from "../app/testdata";
import Tweet from "./Tweet";

// Home for all 3 tweet tabs

// TODO: Pull tweet data from the server here depending on the tab

const Tweets = () => {
  return (
    <div className="content">
      {tweetJson && tweetJson.map((t, i) => <Tweet key={i} data={t} />)}
    </div>
  );
};

export default Tweets;
