import Head from "next/head";
import styles from "@/styles//Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Hero from "./Hero";

interface Props {
  title?: string;
  keywords?: string;
  description?: string;
  children?: JSX.Element | JSX.Element[] | string | string[];
}

const Layout: React.FC<Props> = ({
  title,
  keywords,
  description,
  children,
}) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="descriptions" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Hero />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "Sudan Blogs",
  description: "Website for latest tech related blogs",
  keywords: "cricket, football, f1, tennis, badminton, golf",
};

export default Layout;
