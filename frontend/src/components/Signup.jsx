import "./signup.css";
import { useEffect, useState } from "react";
import useSignup from "../hooks/useSignup";
import { Link, useLocation } from "react-router-dom";

function Signup({ animation, setAnimation }) {
  const { signup, isPending, error } = useSignup();
  const { pathname } = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (pathname === "/signup") {
      setAnimation(true);
    }
  }, [pathname, setAnimation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`sign-up ${animation ? "show" : ""}`}>
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <label htmlFor="username">Username</label>
        <input
          className={`${error && "show-error"}`}
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
          value={formData.username}
        />

        <label htmlFor="emails">Email</label>
        <input
          className={`${error && "show-error"}`}
          id="emails"
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={formData.email}
        />

        <label htmlFor="passwords">Password</label>
        <input
          className={`${error && "show-error"}`}
          id="passwords"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={formData.password}
        />

        <button className="btn">
          {isPending ? "Loading..":"Sign up"}
        </button>
        <Link
          to="/login"
          className="link"
          onClick={() => setAnimation(!animation)}
        >
          Already have an account?
        </Link>
      </form>
    </div>
  );
}

export default Signup;
