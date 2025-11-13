import { Link } from "react-router-dom";

export default function Navbar({ cartCount, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-text">
          <span className="accent">Pâtisserie</span>
          <span className="main">Boulangerie Mourad</span>
        </Link>
      </div>

      <ul className="menu">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/products">Produits</Link></li>
        {user?.role !== "admin" && <li><Link to="/cart">Panier ({cartCount})</Link></li>}
        {user?.token ? (
          <>
            {user.role === "admin" && <li><Link to="/admin">Admin</Link></li>}
            <li><button className="logout-btn" onClick={onLogout}>Déconnexion</button></li>
          </>
        ) : (
          <li><Link to="/login">Se connecter / S'inscrire</Link></li>
        )}
      </ul>

      {/* Mobile menu button */}
      <div className="mobile-menu-btn" onClick={() => {
        document.querySelector(".mobile-menu")?.classList.toggle("open");
      }}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className="mobile-menu">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/products">Produits</Link></li>
        {user?.role !== "admin" && <li><Link to="/cart">Panier ({cartCount})</Link></li>}
        {user?.token ? (
          <>
            {user.role === "admin" && <li><Link to="/admin">Admin</Link></li>}
            <li><button className="logout-btn" onClick={onLogout}>Déconnexion</button></li>
          </>
        ) : (
          <li><Link to="/login">Se connecter / S'inscrire</Link></li>
        )}
      </ul>
    </nav>
  );
}
