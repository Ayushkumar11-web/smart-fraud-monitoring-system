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

            // Debug
            console.log("Email:", email);
            console.log("Password:", password);

            const response = await login(email, password);

            console.log("Login Response:", response);

            // Save JWT Token
            localStorage.setItem("token", response.token);

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            console.error("========== LOGIN ERROR ==========");
            console.error(error);

            if (error.response) {

                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);

                alert(error.response.data.error || "Login Failed");

            } else if (error.request) {

                console.log("No response received from backend");
                console.log(error.request);

                alert(error.message);

                console.log(error);
                console.log(error.request);
                console.log(error.response);
            } else {

                console.log("Message:", error.message);

                alert(error.message);
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

                        <label className="form-label">
                            Email
                        </label>

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

                        <label className="form-label">
                            Password
                        </label>

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