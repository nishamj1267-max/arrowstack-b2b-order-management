import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Temporary navigation (real authentication later)
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>ArrowStack B2B</h1>
        <p>Order Management Platform</p>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button onClick={handleLogin}>Login</button>

        <p className="link-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;