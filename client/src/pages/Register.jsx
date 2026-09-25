
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Create Account</h1>
        <p>ArrowStack B2B Platform</p>

        <Input
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          placeholder="Company Name"
          name="company"
          value={form.company}
          onChange={handleChange}
        />

        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <Button text="Create Account" onClick={handleRegister} />

        <p className="link-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;