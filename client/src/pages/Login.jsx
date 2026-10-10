
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email.trim() || !form.password) {
      alert("Please enter Email and Password!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="brand-box">
          <h1>ArrowStack</h1>
          <h2>B2B Order Management</h2>
          <p>
            Manage products, orders and customers from one professional
            dashboard.
          </p>

          <div className="feature-list">
            <span>Product Management</span>
            <span>Smart Orders</span>
            <span>Live Dashboard</span>
            <span>Fast &amp; Secure</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="login-card">
          <h2>Welcome Back!</h2>
          <p>Login to continue</p>

          <Input
            type="email"
            placeholder="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <Button
            text={loading ? "Logging in..." : "Login"}
            onClick={handleLogin}
          />

          <div className="divider">
            <span>OR</span>
          </div>

          <button type="button" className="social-btn google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Continue with Google
          </button>

          <button type="button" className="social-btn facebook-btn">
            <img
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook"
            />
            Continue with Facebook
          </button>

          <p className="link-text">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
