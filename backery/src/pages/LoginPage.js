import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const toggleForm = () => setIsSignup(!isSignup);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await axios.post("http://localhost:5000/api/signup", form);
        alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
        setIsSignup(false);
      } else {
        const res = await axios.post("http://localhost:5000/api/login", form);
        const { token, role, name } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", name);
        navigate(role === "admin" ? "/admin" : "/");
      }
    } catch (err) {
      alert("Erreur : " + (err.response?.data?.message || "Vérifiez vos informations"));
    }
  };

  return (
    <div className="login-page">
    <div className="auth-container">
      <div className={`auth-card ${isSignup ? "flipped" : ""}`}>
        {/* LOGIN */}
        <div className="auth-face front">
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="submit">Se connecter</button>
          </form>
          <p>
            Pas encore de compte ?{" "}
            <button onClick={toggleForm} className="link-btn">
              S'inscrire
            </button>
          </p>
        </div>

        {/* SIGNUP */}
        <div className="auth-face back">
          <h2>Créer un compte</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom complet"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="submit">S'inscrire</button>
          </form>
          <p>
            Déjà un compte ?{" "}
            <button onClick={toggleForm} className="link-btn">
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
