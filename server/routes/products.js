// backend/routes/products.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// GET all products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("GET /products error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// GET single product by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: "ID invalide" });

  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(`GET /products/${id} error:`, err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(results[0]);
  });
});

// CREATE new product
router.post("/", (req, res) => {
  const { name, description, category_id, unit_type, price_per_unit, stock, image, is_customizable } = req.body;
  if (!name || !price_per_unit || !stock) {
    return res.status(400).json({ message: "Nom, prix et stock sont requis" });
  }

  const sql = `
    INSERT INTO products 
      (name, description, category_id, unit_type, price_per_unit, stock, image, is_customizable) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, description || "", category_id || 1, unit_type || "piece", price_per_unit, stock, image || null, is_customizable || 0],
    (err, results) => {
      if (err) {
        console.error("POST /products error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Produit ajouté avec succès", id: results.insertId });
    }
  );
});

// UPDATE product
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: "ID invalide" });

  const { name, description, category_id, unit_type, price_per_unit, stock, image, is_customizable } = req.body;

  const sql = `
    UPDATE products SET 
      name = ?, 
      description = ?, 
      category_id = ?, 
      unit_type = ?, 
      price_per_unit = ?, 
      stock = ?, 
      image = ?, 
      is_customizable = ? 
    WHERE id = ?
  `;

  db.query(
    sql,
    [name, description || "", category_id || 1, unit_type || "piece", price_per_unit, stock, image || null, is_customizable || 0, id],
    (err, results) => {
      if (err) {
        console.error(`PUT /products/${id} error:`, err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0) return res.status(404).json({ message: "Produit non trouvé" });
      res.json({ message: "Produit modifié avec succès" });
    }
  );
});

// DELETE product
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: "ID invalide" });

  db.query("DELETE FROM products WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(`DELETE /products/${id} error:`, err);
      return res.status(500).json({ error: "Database error. Check foreign key constraints." });
    }
    if (results.affectedRows === 0) return res.status(404).json({ message: "Produit non trouvé" });
    res.json({ message: "Produit supprimé avec succès" });
  });
});

export default router;
