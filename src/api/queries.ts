import { Profile, SearchParams, Tweet } from "@/global/interfaces";

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
  params: SearchParams,
  page: number,
  size: number
) => {
  let searchString = "";
  if (params.term) {
    searchString += `&contains_text=${params.term}`;
  }
  if (params.startDate && params.endDate) {
    searchString += `&from_date=${
      params.startDate.toISOString().split("T")[0]
    }&to_date=${params.endDate.toISOString().split("T")[0]}`;
  }
  return (await fetch(
    `https://twitter-api.reckful-archive.org/tweets/${profile}?page=${page}&size=${size}${searchString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json())) as Tweet[];
};
