import { faSignInAlt, FaUser } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import AuthContext from "@/context/AuthContext";

export default function signUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { signup, error } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Password donot match");
      return;
    }
    signup({ username, email, password });
  };

  return (
    <Layout title="User Sign Up">
      <div className={styles.auth}>
        <h1>
          <FaUser /> SignIn
        </h1>

        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username </label>
            <input
              type="text"
              value={username}
              id="uaername"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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

          <div>
            <label htmlFor="passwordConfirm">Confirm Password </label>
            <input
              type="password"
              value={passwordConfirm}
              id="confirmPassword"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type="submit" value="Sign Up" className="btn" />
        </form>
        <p>
          Dont have an account ? <Link href="/auth/signin">SignIn</Link>
        </p>
      </div>
    </Layout>
  );
}
