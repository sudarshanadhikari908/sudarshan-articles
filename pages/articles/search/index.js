import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import HomePage from "@/components/HomePage";
import styles from "@/styles/News.module.css";
import qs from "qs";
import { useRouter } from "next/router";

export default function SearchPage({ articles }) {
  const router = useRouter();
  return (
    <div>
      <Layout title="Search Result">
        <h1>Search Result for {router.query.term}</h1>
        {articles.length === 0 && (
          <h3>No Search Found!! for {router.query.term}</h3>
        )}
        {articles.map((article) => (
          <HomePage articles={article} key={article.id} />
        ))}

        <Link href="/">
          <a className={styles.back}> Go Back </a>
        </Link>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [{ name_contains: term }, { detail_contains: term }],
    },
  });
  const res = await fetch(`${API_URL}/sports?${query}`);
  const articles = await res.json();
  return {
    props: { articles },
  };
}
