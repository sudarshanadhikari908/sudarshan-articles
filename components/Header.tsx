import Link from "next/link";
import styles from "@/styles//Header.module.css";
import Search from "./Search";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const { user, signout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Sudan Blogs</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/articles">
              <a>Blogs</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/articles/add">
                  <a>Add Articles</a>
                </Link>
              </li>

              <li>
                <Link href="/auth/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <button className="btn-secondary" onClick={() => signout()}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/signin">
                  <a className="btn-secondary">Sign In</a>
                </Link>
              </li>
            </>
          )}

          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
