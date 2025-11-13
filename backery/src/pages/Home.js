import { Link } from "react-router-dom";
export default function Home() {
  return (
        <div className="hero">
        <h1>Bienvenue chez Pâtisserie Boulangerie Mourad</h1>
        <p>
            Découvrez le goût authentique du pain frais et des pâtisseries artisanales. 
            Chaque gâteau et chaque viennoiserie est préparé avec amour et les meilleurs ingrédients pour vous offrir un moment gourmand inoubliable.
        </p>
        <Link to="/products">
            <button>Voir le Menu</button>
        </Link>
        </div>
    );
}
