import Image from "next/image";
import { Tweet } from "@/global/interfaces";
import retweet from "../assets/img/retweet.svg"
import like from "../assets/img/like.svg"

interface TweetProps {
  data: Tweet;
}

const Tweet: React.FC<TweetProps> = ({ data }) => {
  return (
    <div className="tweet">
      <div className="tweet-profile-pic">
        <Image
          width="0"
          height="0"
          sizes="100vw"
          alt="Profile picture"
          src={data.profileInfo.picUrl}
          loading="lazy"
        />
      </div>
      <div className="tweet-content">
        <div className="tweeter-info">
          <span className="name">{data.profileInfo.name}</span>
          <span className="hashtag">@{data.profileInfo.handle}</span>
          <span className="separator">•</span>
          <span className="date-sent">{data.dateSent.dateFormatted}</span>
        </div>
        <div className="tweet-text">
          <p>{data.text.plain}</p>
        </div>
        {data.media.map((m, i) => (
          <div key={i} className="tweet-pic">
            {m.type === "photo" && (
              <Image
                width="0"
                height="0"
                sizes="100vw"
                alt="Picture in the Tweet"
                src={m.url}
                loading="lazy"
              />
            )}
            {m.type === "video" && <video controls src={m.url}></video>}
          </div>
        ))}
        <div className="tweet-react">
          <div className="reaction">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              alt="Retweets"
              src={retweet}
              loading="lazy"
            />
            <span className="react-amount">
              {data.reactions.retweets.formatted}
            </span>
          </div>
          <div className="reaction">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              alt="Likes"
              src={like}
              loading="lazy"
            />
            <span className="react-amount">
              {data.reactions.likes.formatted}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
