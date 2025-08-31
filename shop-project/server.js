// -------------------- Module einbinden --------------------
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- Middleware --------------------
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Frontend bereitstellen

// -------------------- Verbindung zur MySQL-Datenbank --------------------
const db = mysql.createConnection({
  host: process.env.DB_HOST,     //  Server
  user: process.env.DB_USER,     // Benutzer
  password: process.env.DB_PASS,          // Passwort
  database: process.env.DB_PORT || 5432    // Name der Datenbank
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err));

// -------------------- Cart (Warenkorb) --------------------
let cart = [];

// Produkt hinzufügen
app.post("/cart", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Name und Preis erforderlich!" });
  }
  cart.push({ name, price });
  res.json({ message: `${name} wurde zum Warenkorb hinzugefügt!` });
});

// Alle Produkte abrufen
app.get("/cart", (req, res) => {
  res.json(cart);
});

// Produkt nach Index entfernen
app.delete("/cart/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    res.json({ message: "Produkt entfernt" });
  } else {
    res.status(400).json({ message: "Ungültiger Index" });
  }
});

// Warenkorb leeren
app.delete("/cart", (req, res) => {
  cart = [];
  res.json({ message: "Warenkorb geleert!" });
});

// -------------------- Test-Route --------------------
app.get("/api/test", (req, res) => {
  res.json({ nachricht: "Backend läuft und MySQL ist verbunden!" });
});

// -------------------- Server starten --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
