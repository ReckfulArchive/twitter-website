import Image from "next/image";
import ReactPlayer from "react-player/lazy";
import { Tweet } from "@/global/interfaces";
import retweet from "/public/retweet.svg";
import like from "/public/like.svg";

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
        {data.replyToHandles && (
          <div className="replying-to">
            {data.replyToHandles.map((h, i) => (
              <a key={i} href={`https://twitter.com/${h}`} target="_blank">
                @{h}
                {i != data.replyToHandles!.length - 1 ? ", " : ""}
              </a>
            ))}
          </div>
        )}
        <div className="tweet-text">
          <p>
            {data.text.tokenized.map((t, i) =>
              t.type === "link" ? (
                <a key={i} href={t.url} target="_blank">
                  {t.text}{" "}
                </a>
              ) : (
                t.text
              )
            )}
          </p>
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
            {m.type === "video" && (
              <ReactPlayer controls url={m.url} width="100%" height="100%" />
            )}
          </div>
        ))}
        {data.replyToHandles && (
          <div className="show-thread">
            <a href={data.twitterUrl}>Show this thread</a>
          </div>
        )}
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
