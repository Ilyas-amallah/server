import mysql from "mysql2";

const db = mysql.createConnection({
  host: "sql108.infinityfree.com",
  user: "if0_40385810",
  password: "jMNV38LmfKV8pK",
  database: "if0_40385810_backery"
});

db.connect((err) => {
  if (err) console.error("❌ DB connection failed:", err);
  else console.log("✅ Connected to MySQL");
});

export default db;
