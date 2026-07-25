import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login(email, password);

            // JWT Token Save
            localStorage.setItem("token", response.token);

            alert("Login Successful");

            // Dashboard Redirect
            navigate("/dashboard");

        } catch (error) {
            console.error("Login Error:", error);

            if (error.response) {
                alert(error.response.data.message || "Invalid Email or Password");
            } else {
                alert("Unable to connect to server.");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h2 className="login-title">
                    Fraud Detection System
                </h2>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">
                        <label className="form-label">Email</label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-login"
                    >
                        Login
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Login;