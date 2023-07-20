import Image from "next/image";
import discordSearch from "/public/discord-search.svg";
import Link from "next/link";
import { Suspense } from "react";
import TwitterContent from "@/components/TwitterContent";

export default function Home() {
  return (
    <main>
      <div className="page">
        <div className="page-content">
          <Suspense>
            <TwitterContent />
          </Suspense>
          <footer className="nav-bar-bottom">
            <Link href="/">
              <Image fill alt="Search" src={discordSearch} />
            </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
