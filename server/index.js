// index.js
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./db.js"; // ✅ use your db connection
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import userRoutes from "./routes/users.js";




const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const JWT_SECRET = "mourad_secret"; // ideally use .env file

// 🟩 SIGNUP
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(400).json({ message: "Email déjà utilisé" });
        return res.status(500).json({ message: "Erreur serveur" });
      }
      res.json({ message: "Utilisateur créé avec succès" });
    }
  );
});
app.use("/api/users", userRoutes);
// 🟦 LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const user = results[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
      message: "Connexion réussie"
    });
  });
});


// 🟨 PROTECTED ROUTE (example)
app.get("/api/admin/users", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Non autorisé" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== "admin") {
      return res.status(403).json({ message: "Accès refusé" });
    }

    db.query("SELECT id, name, email, role, created_at FROM users", (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur" });
      res.json(result);
    });
  });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
