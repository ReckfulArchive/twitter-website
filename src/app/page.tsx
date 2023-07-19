import "../assets/css/main.css";
import "../assets/css/tweaks.css";
import Profile from "@/components/Profile";
import Tweets from "@/components/Tweets";
import { profileJson } from "./testdata";
import Image from "next/image";
import discordSearch from "../assets/img/discord-search.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="page">
        <div className="page-content">
          <Profile data={profileJson} />
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
