
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!form.email || !form.password) {
      alert("Please enter Email and Password!");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      {/* Left Branding */}
      <div className="auth-left">
        <div className="brand-box">
          <h1>ArrowStack</h1>
          <h2>B2B Order Management</h2>
          <p>
            Manage products, orders and customers from one professional
            dashboard.
          </p>

          <div className="feature-list">
            <span>📦 Product Management</span>
            <span>🛒 Smart Orders</span>
            <span>📊 Live Dashboard</span>
            <span>🚀 Fast & Secure</span>
          </div>
        </div>
      </div>

      {/* Right Login Card */}
      <div className="auth-right">
        <div className="login-card">
          <h2>Welcome Back 👋</h2>
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

          <Button text="Login" onClick={handleLogin} />

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="social-btn google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Continue with Google
          </button>

          <button className="social-btn facebook-btn">
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