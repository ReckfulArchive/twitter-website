"use client";

import HomeContent from "@/components/HomeContent";
import { useEffect, useState } from "react";

export default function Home() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  return (
    <main>
      <HomeContent isPageLoaded={isPageLoaded} />
    </main>
  );
}
