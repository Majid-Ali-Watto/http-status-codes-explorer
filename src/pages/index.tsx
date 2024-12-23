import Header from "../components/Header";
import CodeList from "../components/CodeList";
import Footer from "@/components/Footer";
import { useState, use } from "react";
import statusCodes from "@/assets/codes-list";
import Head from "next/head";
import { UrlContext } from "./_app";
import { keywords } from "@/assets/keywords";
export default function Home() {
  const [filteredCode, setFilteredCode] = useState(statusCodes)
  const { url } = use(UrlContext)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "HTTP Status Codes Explorer",
    description: "Explore HTTP status codes with descriptions and examples.",
    url,
  };
  return (
    <div
      className={`min-h-screen gap-16`}
    >
      <Head>
        <title>HTTP Status Codes Explorer</title>
        <meta name="description" content="Explore HTTP status codes with descriptions and examples. Filter, search, and download codes as PDF." />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Majid Ali - Full Stack Web Developer" />
        <meta property="og:title" content="HTTP Status Codes Explorer" />
        <meta property="og:description" content="Explore HTTP status codes with descriptions and examples. Filter, search, and download codes as PDF." />
        <meta property="og:image" content="/http-icon.png" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href={url} />
      </Head>
      <main className="min-h-[91dvh] flex flex-col gap-8">
        <Header setFilteredCode={setFilteredCode} filteredCode={filteredCode} />
        <CodeList filteredCode={filteredCode} />
      </main>
      <Footer />
    </div>
  );
}
