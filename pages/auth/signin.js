import { faSignInAlt, FaUser } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import AuthContext from "@/context/AuthContext";

export default function signInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin, error] = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    signin({ email, password });
  };

  return (
    <Layout title="User Sign In">
      <div className={styles.auth}>
        <h1>
          <FaUser /> SignIn
        </h1>

        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email </label>
            <input
              type="text"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Sign In" className="btn" />
        </form>
        <p>
          Dont have an account ? <Link href="/auth/signup">SignUp</Link>
        </p>
      </div>
    </Layout>
  );
}
