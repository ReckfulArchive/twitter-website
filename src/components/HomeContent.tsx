"use client";

import { getAllProfiles, getProfile } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import "../styles/home.css";
import Image from "next/image";
import { Oval } from "react-loader-spinner";

interface HomeContentProps {
  isPageLoaded: boolean;
}

const HomeContent: React.FC<HomeContentProps> = ({ isPageLoaded }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["getProfile"],
    suspense: true,
    staleTime: 30 * (60 * 1000),
    cacheTime: 35 * (60 * 1000),
    enabled: isPageLoaded,
    queryFn: () => getAllProfiles(),
  });

  return (
    <div className="container">
      {isLoading ? (
        <Oval
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={5}
          strokeWidthSecondary={1}
          color="blue"
          secondaryColor="white"
        />
      ) : (
        <>
          <h2 className="header">Choose a profile!</h2>
          <div className="content">
            {data &&
              data.map((p, i) => (
                <div className="profile" key={i}>
                  <a href={`/${p.handle.toLowerCase()}`}>
                    <Image
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="profileImage"
                      alt="Picture in the Tweet"
                      src={p.profilePicUrl}
                    />
                  </a>
                  <h4 className="profileName">{p.handle}</h4>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeContent;
