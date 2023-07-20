import { Profile, Tweet } from "@/global/interfaces";

export const getProfile = async (profile: string) => {
  return (await fetch(
    `https://twitter-api.reckful-archive.org/profile/${profile}`,
    {
      method: "GET",
    }
  ).then((res) => res.json())) as Profile;
};

export const getTweets = async (
  profile: string,
  type: string,
  media: boolean,
  page: number,
  size: number
) => {
  return (await fetch(
    `https://twitter-api.reckful-archive.org/tweets/${profile}?type=${type}&only_with_media=${media}&page=${page}&size=${size}`,
    {
      method: "GET",
      // mode: "no-cors",
    }
  ).then((res) => res.json())) as Tweet[];
};
