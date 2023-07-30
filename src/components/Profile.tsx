"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import verify from "/public/verify.svg";
import location from "/public/location.svg";
import link from "/public/link.svg";
import birthday from "/public/birthday.svg";
import calendar from "/public/calendar.svg";
import { tabs } from "@/global/data";
import { Profile, TweetTabObj } from "@/global/interfaces";

interface ProfileProps {
  data: Profile;
  activeTab: TweetTabObj;
  setActiveTab: Dispatch<SetStateAction<TweetTabObj>>;
}

const Profile: React.FC<ProfileProps> = ({ data, activeTab, setActiveTab }) => {
  const toggleTab = (i: number) => {
    setActiveTab(tabs[i]);
  };
  return (
    <>
      {data && (
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
                {data.description.tokenized.map((t, i) =>
                  t.type === "link" ? (
                    <a key={i} href={t.url} target="_blank">
                      {t.text}{" "}
                    </a>
                  ) : (
                    t.text
                  )
                )}
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
                <span>Joined {data.joinDate.monthOfYearFormatted}</span>
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
                onClick={() => toggleTab(i)}
              >
                {t.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
