import styles from "@/styles/Home.module.css";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";

interface Prop {
  articles: {
    name: string;
    image: BinaryData;
    date: Date;
    time: string;
    slug: string;
  }[];
}

export default function HomePage({ articles }) {
  return (
    <div className={styles.news}>
      <div className={styles.img}>
        <Image
          src={
            articles.image
              ? articles.image.formats.thumbnail.url
              : "/images/hero.jpg"
          }
          width={150}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {moment(articles.date).format("yyyy-MM-DD")} {articles.time}
        </span>
        <h3>{articles.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/articles/${articles.slug}`}>
          <a className="btn">Read More</a>
        </Link>
      </div>
    </div>
  );
}
