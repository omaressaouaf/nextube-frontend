import Head from "next/head";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const sidebarLessPathnames = ["/videos/[id]", "/login", "/register"];
    setSidebarClosed(() => window.screen.width < 800 || sidebarLessPathnames.includes(router.pathname));
  }, [router.pathname]);
  return (
    <>
      <Head>
        <title>NexTube</title>
        <meta name="description" content="The Next Youtube" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-100 h-min-screen">
        {/* Topbar*/}
        <Topbar setSidebarClosed={setSidebarClosed} />

        {/* Body wrapper*/}
        <div className="body-wrapper flex ">
          {/* Sidebar  */}
          <Sidebar sidebarClosed={sidebarClosed} setSidebarClosed={setSidebarClosed} />
          {/* Content */}
          <div className="content container mx-auto px-10 py-5 flex-grow min-h-screen">{children}</div>
        </div>
      </div>
    </>
  );
}
