const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
const cartAmount = document.getElementById("cartAmount");

let isCartShowing = false;

const products = [
  {
    id: 1,
    name: "Floki Vikings",
    price: 70,
    category: "T-shirt",
    img: "img/Floki.jpg",
  },
  {
    id: 2,
    name: "God of war Kratos",
    price: 70,
    category: "T-shirt",
    img: "img/GODOFWAR.jpg",
  },
  {
    id: 3,
    name: "PP",
    price: 70,
    category: "T-shirt",
    img: "img/LOGO.jpeg",
  },
  {
    id: 4,
    name: "Ragnar viking",
    price: 70,
    category: "T-shirt",
    img: "img/Ragnar.jpeg",
  },
  {
    id: 5,
    name: "The weeknd",
    price: 70,
    category: "T-shirt",
    img: "img/WEEknd.jpg",
  },
 
];

products.forEach(
  ({ name, id, price, category,img }) => {
    dessertCards.innerHTML += `
    
      <div class="dessert-card">
        <h2><span class="code">۞</span>${name}<span class="code">۞</span></h2>
        <p class="dessert-price">${price} DH</p>
        <p class="product-category">Categorie: ${category}</p>
        <img class="product-image" src="${img}" alt="product" />
        
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Ajouter au panier
        </button>
      </div>
    `;
  }
);

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
    })

    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    currentProductCount > 1 
      ? currentProductCountSpan.textContent = `${currentProductCount}x`
      : productsContainer.innerHTML += `
      <div id="dessert${id}" class="product">
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>${name}
        </p>
        <p>${price} DH</p>
      </div>
      `;
  }

  getCounts() {
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      alert("Votre panier est déjà vide");
      return;
    }

    const isCartCleared = confirm(
      "Etes-vous sûr de vouloir supprimer tous les articles de votre panier ?"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
      cartAmount.textContent = 0;
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `${subTotal.toFixed(2)} DH`;
    cartTaxes.textContent = `${tax.toFixed(2)} DH`;
    cartTotal.textContent = `${this.total.toFixed(2)} DH`;
    
    return this.total;
  }
};

const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach(
  (btn) => {
    btn.addEventListener("click", (event) => {
      cart.addItem(Number(event.target.id), products);
      totalNumberOfItems.textContent = cart.getCounts();
      cartAmount.textContent = cart.getCounts();

      cart.calculateTotal();
    })
  }
);

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Masquer" : "Afficher";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart))