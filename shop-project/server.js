const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));


let cart = [];


app.post("/cart", (req, res) => {
  const { name, price } = req.body;
  cart.push({ name, price });
  res.json({ message: `${name} wurde zum Warenkorb hinzugefügt!` });
});


app.get("/cart", (req, res) => {
  res.json(cart);
});


app.delete("/cart/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    res.json({ message: "Produkt entfernt" });
  } else {
    res.status(400).json({ message: "Ungültiger Index" });
  }
});


app.delete("/cart", (req, res) => {
  cart = [];
  res.json({ message: "Warenkorb geleert!" });
});

 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend läuft auf Port ${PORT}`);
});
