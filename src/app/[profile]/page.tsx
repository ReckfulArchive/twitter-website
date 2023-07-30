"use client";

import "../../styles/main.css";
import "../../styles/tweaks.css";
import Image from "next/image";
import discordSearch from "/public/discord-search.svg";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import TwitterContent from "@/components/TwitterContent";
import { Oval } from "react-loader-spinner";

export default function Profile({ params }: { params: { profile: string } }) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  return (
    <main>
      <div className="page">
        <div className="page-content">
          <Suspense
            fallback={
              <Oval
                ariaLabel="loading-indicator"
                height={100}
                width={100}
                strokeWidth={3}
                strokeWidthSecondary={2}
                color="white"
                secondaryColor="gray"
                wrapperClass="loader"
              />
            }
          >
            <TwitterContent
              isPageLoaded={isPageLoaded}
              profile={params.profile}
            />
          </Suspense>
          <footer className="nav-bar-bottom">
            <Link href={`/search/${params.profile}`}>
              <Image fill alt="Search" src={discordSearch} />
            </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
