import Header from "../components/Header";
import CodeList, { Category } from "../components/CodeList";
import { categoryOf } from "@/assets/categories";
import Footer from "@/components/Footer";
import { useMemo, useState } from "react";
import statusCodes from "@/assets/codes-list";
import Head from "next/head";
import { SITE_URL } from "@/assets/site";
import { keywords } from "@/assets/keywords";
export default function Home() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<Category>("all")
  const filteredCode = useMemo(() => {
    const q = query.toLowerCase().trim()
    return statusCodes.filter((code) =>
      (category === "all" || categoryOf(code.code) === category) &&
      (String(code.code).includes(q) || code.title.toLowerCase().includes(q))
    )
  }, [query, category])
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "HTTP Status Codes Explorer",
    description: "Explore HTTP status codes with descriptions and examples.",
    url: SITE_URL,
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
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href={SITE_URL} />
      </Head>
      <main className="min-h-[91dvh] flex flex-col gap-8">
        <Header query={query} onQueryChange={setQuery} filteredCode={filteredCode} />
        <CodeList filteredCode={filteredCode} category={category} onCategoryChange={setCategory} />
      </main>
      <Footer />
    </div>
  );
}
