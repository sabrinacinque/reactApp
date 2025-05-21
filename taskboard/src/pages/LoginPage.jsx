import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // email o username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const body = await res.json();

      if (res.ok && body.success) {
        localStorage.setItem("token", body.sessiondata.token);
        // eventuale user info
        navigate("/dashboard");
      } else {
        setError(body.message || "Login fallito");
      }
    } catch (err) {
      console.error(err);
      setError("Errore di rete");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email o Username</label>
          <br />
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ marginTop: "1rem" }}>
          Accedi
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Non sei registrato?{" "}
        <Link to="/register">Clicca qui per registrarti</Link>
      </p>
    </div>
  );
}
