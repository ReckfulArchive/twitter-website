import "../styles/pageHead.css";
import verify from "/public/verify.svg";
import Link from "next/link";
import Image from "next/image";
import home from "/public/reply.svg";

interface PageHeadProps {
  profile: string;
  name: string;
}

const PageHead: React.FC<PageHeadProps> = ({ profile, name }) => {
  return (
    <div className="pageHead">
      <a className="homeButton" href="/">
        <Image width="40" height="40" alt="home image" src={home} />
      </a>
      <Link className="headNamePlate" href={`/${profile}`}>
        <h4>{name}</h4>
        <Image width="0" height="0" alt="Verified icon" src={verify} />
      </Link>
    </div>
  );
};

export default PageHead;
