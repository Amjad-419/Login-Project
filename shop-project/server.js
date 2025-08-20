const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));


// 🛒 سلة المشتريات (مؤقتة في الذاكرة)
let cart = [];

// إضافة منتج
app.post("/cart", (req, res) => {
  const { name, price } = req.body;
  cart.push({ name, price });
  res.json({ message: `${name} wurde zum Warenkorb hinzugefügt!` });
});

// عرض السلة
app.get("/cart", (req, res) => {
  res.json(cart);
});

// حذف منتج
app.delete("/cart/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    res.json({ message: "Produkt entfernt" });
  } else {
    res.status(400).json({ message: "Ungültiger Index" });
  }
});

// تفريغ السلة
app.delete("/cart", (req, res) => {
  cart = [];
  res.json({ message: "Warenkorb geleert!" });
});

// بدء السيرفر
app.listen(5000, () => {
  console.log("Backend läuft auf http://localhost:5000");
});
