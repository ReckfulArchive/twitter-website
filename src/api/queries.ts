import { Profile, Tweet } from "@/global/interfaces";

export const getProfile = async (profile: string) => {
  return (await fetch(
    `https://twitter-api.reckful-archive.org/profile/${profile}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json())) as Profile;
};

export const getAllProfiles = async () => {
  return (await fetch(`https://twitter-api.reckful-archive.org/profile/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())) as Profile[];
};

export const getTweets = async (
  profile: string,
  types: string[],
  media: boolean,
  page: number,
  size: number
) => {
  return (await fetch(
    `https://twitter-api.reckful-archive.org/tweets/${profile}?type=${types}&only_with_media=${media}&page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json())) as Tweet[];
};

export const getSearchedTweets = async (
  profile: string,
  searchTerm: string,
  page: number,
  size: number
) => {
  return (await fetch(
    `https://twitter-api.reckful-archive.org/tweets/${profile}?contains_text=${searchTerm}&page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json())) as Tweet[];
};

