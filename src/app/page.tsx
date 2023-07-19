import "../assets/css/main.css";
import "../assets/css/tweaks.css";
import Profile from "@/components/Profile";
import Tweets from "@/components/Tweets";
import Image from "next/image";
import discordSearch from "../assets/img/discord-search.svg";
import Link from "next/link";

// Can wrap query components like Profile or Tweets in <Suspense> to provide fallback HTML as they are loading from the server

export default function Home() {
  return (
    <main>
      <div className="page">
        <div className="page-content">
          <Profile />
          <Tweets />
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
