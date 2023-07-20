"use client";

import { Dispatch, MouseEvent, SetStateAction } from "react";
import Image from "next/image";
import verify from "../assets/img/verify.svg";
import location from "../assets/img/location.svg";
import link from "../assets/img/link.svg";
import birthday from "../assets/img/birthday.svg";
import calendar from "../assets/img/calendar.svg";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/queries";

const tabs = ["Tweets", "Tweets & Replies", "Media"];

interface ProfileProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const Profile: React.FC<ProfileProps> = ({ activeTab, setActiveTab }) => {
  const { isLoading, refetch, data } = useQuery({
    queryKey: ["getProfile"],
    suspense: true,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
    queryFn: () => getProfile("byron"),
  });
  const toggleTab = (e: MouseEvent, i: number) => {
    setActiveTab(tabs[i]);
  };
  return (
    <>
      {!isLoading && data && (
        <div className="profile-top-container">
          <div className="header-photo">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              alt="Banner"
              src={data.bannerUrl}
            />
          </div>
          <div className="profile">
            <div className="prof-pic-and-buttons-row">
              <div className="prof-pic">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="Profile picture"
                  src={data.profilePicUrl}
                />
              </div>
            </div>
            <div className="username">
              <span>{data.name}</span>
              <Image
                width="0"
                height="0"
                sizes="100vw"
                alt="Verified icon"
                src={verify}
              />
            </div>
            <div className="hashtagNumber">@{data.handle}</div>
            <div className="bio">
              <span>
                was the highest rated player in @Warcraft, now the creator of
                @PlayEverland. inquiries: reckful@getader.com #blm
              </span>
            </div>
            <div className="location-link-bday-joined">
              <div className="location">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="Location"
                  src={location}
                />
                <span>Austin, TX</span>
              </div>
              <div className="link">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="Link"
                  src={link}
                />
                <span>
                  <a href={data.link} target="_blank">
                    {data.link.replace("https://", "")}
                  </a>
                </span>
              </div>
              <div className="bday">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="Birthday"
                  src={birthday}
                />
                <span>May 8</span>
              </div>
              <div className="date-joined">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="Date joined"
                  src={calendar}
                />
                <span>Joined February 2012</span>
              </div>
            </div>
            <div className="following-follower">
              <div>
                <span className="follow-number">
                  {data.following.formatted}
                </span>
                <span className="follow-text">Following</span>
              </div>
              <div>
                <span className="follow-number">
                  {data.followers.formatted}
                </span>
                <span className="follow-text">Followers</span>
              </div>
            </div>
          </div>
          <div className="profile-divider"></div>
          <div className="profile-tweets-tabs">
            {tabs.map((t, i) => (
              <button
                key={i}
                className={`tab-button ${activeTab === t && "active"}`}
                onClick={(e) => toggleTab(e, i)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
