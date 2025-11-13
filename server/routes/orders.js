import express from "express";
import db from "../db.js";

const router = express.Router();

// Create new order
router.post("/", (req, res) => {
  const { customer_name, phone, total_price, items } = req.body;

  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: err });

    db.query(
      "INSERT INTO orders (customer_name, phone, total_price) VALUES (?,?,?)",
      [customer_name, phone, total_price],
      (err, result) => {
        if (err) return db.rollback(() => res.status(500).json({ error: err }));

        const orderId = result.insertId;
        const values = items.map((it) => [orderId, it.id, it.quantity, it.price]);

        db.query(
          "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
          [values],
          (err) => {
            if (err)
              return db.rollback(() => res.status(500).json({ error: err }));

            db.commit((err) => {
              if (err) return db.rollback(() => res.status(500).json({ error: err }));
              res.json({ message: "✅ Order created", orderId });
            });
          }
        );
      }
    );
  });
});

export default router;
