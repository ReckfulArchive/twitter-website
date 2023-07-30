"use client";

import "../../styles/main.css";
import "../../styles/tweaks.css";
import Image from "next/image";
import discordSearch from "/public/discord-search.svg";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import TwitterContent from "@/components/TwitterContent";

export default function Profile({ params }: { params: { profile: string } }) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  return (
    <main>
      <div className="page">
        <div className="page-content">
          <Suspense>
            <TwitterContent isPageLoaded={isPageLoaded} profile={params.profile} />
          </Suspense>
          <footer className="nav-bar-bottom">
            <Link href={`/${params.profile}`}>
              <Image fill alt="Search" src={discordSearch} />
            </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
