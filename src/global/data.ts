import { TweetTab } from "./enums";
import { TweetTabObj } from "./interfaces";

export const tabs: TweetTabObj[] = [
  { type: TweetTab.TWEETS, text: "Tweets" },
  { type: TweetTab.REPLIES, text: "Tweets & Replies" },
  { type: TweetTab.MEDIA, text: "Media" },
];
