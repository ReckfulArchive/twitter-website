"use client";

import "../../../styles/main.css";
import "../../../styles/tweaks.css";
import Link from "next/link";
import SearchContent from "@/components/SearchContent";

export default function Search({ params }: { params: { profile: string } }) {
  return (
    <main>
      <div className="page">
        <div className="page-content">
          <SearchContent profile={params.profile} />
          <footer className="nav-bar-bottom">
            <Link href={`/search/${params.profile}`} />
          </footer>
        </div>
      </div>
    </main>
  );
}
