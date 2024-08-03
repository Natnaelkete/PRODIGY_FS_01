import "./login.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function Login({ animation, setAnimation }) {
  const { login, isPending, error } = useLogin();
  const { pathname } = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (pathname === "/login") {
      setAnimation(false);
    }
  }, [pathname, setAnimation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className={`sign-in ${animation ? "hide" : ""}`}>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="email">Email</label>
        <input
          className={`${error && "show-error"}`}
          id="email"
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={formData.email}
        />

        <label htmlFor="password">Password</label>
        <input
          className={`${error && "show-error"}`}
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={formData.password}
        />
        <button className="btn">{isPending ? "Loading.." : "Sign in"}</button>
        {/* {isError && <p>{error.response.data.message}</p>} */}
        <Link
          to="/signup"
          className="link"
          onClick={() => setAnimation(!animation)}
        >
          Create new account?
        </Link>
      </form>
    </div>
  );
}

export default Login;
