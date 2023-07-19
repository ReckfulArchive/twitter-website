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
  page: number,
  size: number
) => {
  return (await fetch(
    `https://twitter-api.reckful-archive.org/tweets/${profile}?page=${page}&size=${size}`,
    {
      method: "GET",
    }
  ).then((res) => res.json())) as Tweet[];
};
