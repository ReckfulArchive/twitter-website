"use client";

import "../../../styles/main.css";
import "../../../styles/tweaks.css";
import Link from "next/link";
import SearchContent from "@/components/SearchContent";
import { Suspense } from "react";
import { Oval } from "react-loader-spinner";

export default function Search({ params }: { params: { profile: string } }) {
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
            <SearchContent profile={params.profile} />
          </Suspense>
          <footer className="nav-bar-bottom">
            <Link href={`/search/${params.profile}`} />
          </footer>
        </div>
      </div>
    </main>
  );
}
