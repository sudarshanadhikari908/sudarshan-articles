import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import HomePage from "@/components/HomePage";
import styles from "@/styles/News.module.css";
import Pagination from "@/components/Pagination";

export default function Articles({ articles, page, total }) {
  return (
    <div>
      <Layout>
        <Link href="/">
          <a className={styles.back}> Go Back </a>
        </Link>
        <h1>Articles</h1>
        {articles.length === 0 && <h3>No articles</h3>}
        {articles.map((article) => (
          <HomePage articles={article} key={article.id} />
        ))}
        <Pagination page={page} total={total} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Total Count

  const totalRes = await fetch(`${API_URL}/sports/count`);
  const total = await totalRes.json();

  const articleRes = await fetch(
    `${API_URL}/sports?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const articles = await articleRes.json();
  return {
    props: { articles, page: +page, total },
  };
}
