import { TweetTab } from "./enums";

export interface Tweet {
  type: string;
  id: string;
  twitterUrl: string;
  profileInfo: ProfileInfo;
  dateSent: DateObj;
  location?: Location;
  replyToHandles?: string[];
  text: Text;
  media: Media[];
  quote?: Quote;
  reactions: Reactions;
}

export interface Profile {
  name: string;
  handle: string;
  description: Text;
  location: string;
  link: string;
  birthdayDate: DateObj;
  joinDate: DateObj;
  following: ReactionFormat;
  followers: ReactionFormat;
  profilePicUrl: string;
  bannerUrl: string;
}

export interface TweetTabObj {
  type: TweetTab;
  text: string;
}

export interface SearchParams {
  term?: string,
  startDate?: Date,
  endDate?: Date,
}

interface ProfileInfo {
  picUrl: string;
  name: string;
  handle: string;
}

interface DateObj {
  iso: string;
  dayOfMonthFormatted: string;
  monthOfYearFormatted: string;
  dateFormatted: string;
  dateTimeFormatted: string;
}

interface Location {
  place: string;
  countryCode: string;
  latitude: number;
  longitude: number;
}

interface Text {
  plain: string;
  tokenized: Tokenized[];
  knownUrls: string[];
  knownHandles: string[];
}

interface Tokenized {
  type: string;
  text: string;
  url?: string;
}

interface Media {
  type: string;
  url: string;
}

interface Quote {
  tweetUrl: string;
  quoteHandle: string;
  quoteText: Text;
}

interface Reactions {
  likes: ReactionFormat;
  retweets: ReactionFormat;
}

interface ReactionFormat {
  plain: number;
  formatted: string;
}
