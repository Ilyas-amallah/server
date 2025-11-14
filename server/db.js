import mysql from "mysql2";

const db = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7807675",
  password: "Ep73tW2h2y",
  database: "sql7807675"
});

db.connect((err) => {
  if (err) console.error("❌ DB connection failed:", err);
  else console.log("✅ Connected to MySQL");
});

export default db;
