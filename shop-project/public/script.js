// ---------------- Login/Register Popup ----------------


const contanier = document.querySelector('.contanier');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnlogin-popup');
const iconClose = document.querySelector('.icon-close');

if (registerLink) {
  registerLink.addEventListener('click', () => {
    contanier.classList.add('active');
  });
}

if (loginLink) {
  loginLink.addEventListener('click', () => {
    contanier.classList.remove('active');
  });
}

if (btnPopup) {
  btnPopup.addEventListener('click', () => {
    contanier.classList.add('active-popup');
  });
}

if (iconClose) {
  iconClose.addEventListener('click', () => {
    contanier.classList.remove('active-popup');
  });
}

// ---------------- Navigation Toggle ----------------
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }


  renderCart();
});


// ---------------- Cart mit Backend ----------------

// Produkt hinzufügen
async function addToCart(name, price) {
  try {
    const response = await fetch("/cart"
, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price })
    });
    const data = await response.json();
    showToast(data.message);
    renderCart();
  } catch (error) {
    console.error("Fehler beim Hinzufügen:", error);
  }
}

//  Warenkorb anzeigen
async function renderCart() {
  try {
    const response = await fetch("/cart");
    const cart = await response.json();

    // in alle Seiten
    updateCartCount(cart);

    // nur Warenkorb
    let cartItemsDiv = document.getElementById("cart-items");
    if (cartItemsDiv) {
      let totalPrice = 0;
      cartItemsDiv.innerHTML = "";

      if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Ihr Warenkorb ist leer.</p>";
      } else {
        cart.forEach((item, index) => {
          totalPrice += item.price;
          cartItemsDiv.innerHTML += `
            <div class="cart-item">
              <p>${item.name} ${item.price}€</p>
              <button onclick="removeFromCart(${index})">Entfernen</button>
            </div>
          `;
        });
      }

      const totalElement = document.getElementById("total-price");
      if (totalElement) {
        totalElement.textContent = "Gesamt: " + totalPrice + "€";
      }
    }
  } catch (error) {
    console.error("Fehler beim Rendern:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart(); // Die Zahl von Warenkorb Aktullieseren
});


// ✅ Produkt entfernen
async function removeFromCart(index) {
  try {
    await fetch(`/cart/${index}`, { method: "DELETE" });
    renderCart();
  } catch (error) {
    console.error("Fehler beim Entfernen:", error);
  }
}

// ✅ Warenkorb leeren
async function clearCart() {
  try {
    await fetch("/cart", { method: "DELETE" });
    renderCart();
  } catch (error) {
    console.error("Fehler beim Leeren:", error);
  }
}

// ✅ Badge aktualisieren
function updateCartCount(cart = []) {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

//Alert

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast-message ${type}`;
  toast.textContent = message;


  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1500);
}


