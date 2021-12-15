import { MdError } from "react-icons/md";

import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/404.module.css";

export default function Error() {
  return (
    <Layout title="page not found">
      <div className={styles.error}>
        <h1>
          <MdError />
          404
        </h1>
        <h4>Sorry Nothing is found</h4>
        <Link href="/">
          <a>Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}
