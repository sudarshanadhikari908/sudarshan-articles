import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import HomePage from "@/components/HomePage";

interface ArticlesProps {
  articles: {
    length: number;
    id: number;
  }[];
}

export default function Home({ articles }) {
  return (
    <div>
      <Layout>
        hello
        <h1>Latest News</h1>
        {articles.length === 0 && <h3>No articles</h3>}
        {articles.map((article) => (
          <HomePage articles={article} key={article.id} />
        ))}
        {articles.length > 0 && (
          <Link href="/articles">
            <a className="btn-secondary"> View all </a>
          </Link>
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/sports?_sort=date:ASC&_limit=5`);
  const articles = await res.json();
  return {
    props: { articles },
  };
}
