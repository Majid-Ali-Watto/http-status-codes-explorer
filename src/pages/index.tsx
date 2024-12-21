import Header from "../components/Header";
import CodeList from "../components/CodeList";
import Footer from "@/components/Footer";
import { useState } from "react";
import statusCodes from "@/assets/codes-list";
import Head from "next/head";
// import DownloadButton from "../components/DownloadButton";

export default function Home() {
  const [filteredCode, setFilteredCode] = useState(statusCodes)
  return (
    <div
      className={`min-h-screen gap-16`}
    >
      <Head>
        <title>HTTP Status Codes Explorer</title>
        <meta name="description" content="Explore HTTP status codes with descriptions and examples. Filter, search, and download codes as PDF." />
        <meta name="keywords" content="HTTP, Status Codes, HTTP Codes, Developer Tools" />
        <meta name="author" content="Majid Ali - Full Stack Web Developer" />
        <meta property="og:title" content="HTTP Status Codes Explorer" />
        <meta property="og:description" content="Explore HTTP status codes with descriptions and examples. Filter, search, and download codes as PDF." />
        <meta property="og:image" content="/social-image.png" />
        <meta property="og:url" content="https://httpstatuscodes.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className="min-h-[91dvh] flex flex-col gap-8">
        <Header setFilteredCode={setFilteredCode} filteredCode={filteredCode} />
        <CodeList filteredCode={filteredCode} />
        {/* <DownloadButton /> */}
      </main>
      <Footer />
    </div>
  );
}
