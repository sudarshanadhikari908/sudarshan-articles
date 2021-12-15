import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import styles from "@/styles/News.module.css";
import moment from "moment";

export default function ArticleDetail({ news }) {
  const router = useRouter();

  const deleteNews = async (e): Promise<any> => {
    if (window.confirm("Are you sure you want to delete?")) {
      const res = await fetch(`${API_URL}/sports/${news.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error("Something went wrong");
      } else {
        router.push("/articles");
      }
    }
  };

  return (
    <div>
      <Layout>
        <div className={styles.news}>
          <div className={styles.controls}>
            <Link href={`/articles/edit/${news.id}`}>
              <button className="btn-edit">Edit</button>
            </Link>
            <Link href={`/articles`}>
              <button className="btn-delete" onClick={deleteNews}>
                Delete
              </button>
            </Link>
          </div>
          <span>
            {moment(news.date).format("yyyy-MM-DD")} {news.time}
          </span>
          <ToastContainer />

          <h1>{news.name}</h1>
          {news.image && (
            <div className={styles.image}>
              <Image
                src={
                  news.image
                    ? news.image.formats.medium.url
                    : "/images/hero.jpg"
                }
                width={900}
                height={600}
              />
            </div>
          )}
          <p>{news.detail}</p>
          <Link href="/articles">
            <a className={styles.back}>Go Back</a>
          </Link>
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticPaths() {
  // console.log("It is query" + slug);
  const res = await fetch(`${API_URL}/sports`);
  const news = await res.json();
  const paths = news.map((item) => ({
    params: { slug: item.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/sports?slug=${slug}`);
  const blogs = await res.json();
  return {
    props: {
      news: blogs[0],
    },
    revalidate: 1,
  };
}
