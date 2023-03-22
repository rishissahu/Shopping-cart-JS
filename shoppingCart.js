import items from "./items.json"
import addGlobalEventListener from "./utils/addGlobalEventListener"
const cartBtn = document.querySelector("[cart-button]")
const cartItemWrapper = document.querySelector("[cart-items-wrapper]")
const cartItems = document.querySelector("[cart-items]")
import { textToCurrency } from "./utils/currencyFormate.js"
const cartItemsTemplate = document.querySelector("#cart-item")
let shoppingcartItems = []
const IMG_URL = "https://dummyimage.com/210x130"
const cartItemQua = document.querySelector("[cart-item-total-quantity]")
const cartTotalPrice = document.querySelector("[cart-total-price]")
const cart = document.querySelector("[data-cart]")


export function setupShoppingCart() {
    addGlobalEventListener("click", "[data-remove-from-cart-button]", e => {
        const id = e.target.closest("[data-item]").dataset.itemId
        removeFromCart(parseInt(id))
    })
    renderCart();
}

cartBtn.addEventListener('click', () => {
    cartItemWrapper.classList.toggle("invisible")
})

function renderCart() {
    if (shoppingcartItems.length == 0) {
        hideCart();
    } else {
        showCart();
        renderCartItem();
    }
}
function hideCart() {
    cart.classList.add("invisible")
    cartItemWrapper.classList.add("invisible")

}
function showCart() {
    cart.classList.remove("invisible")
}

export function addToCart(id) {
    const itemPresent = shoppingcartItems.find(entry => entry.id === id)
    if (itemPresent) {
        itemPresent.quantity++
    }
    else {
        shoppingcartItems.push({ id: id, quantity: 1 })
    }
    renderCart()
}

function removeFromCart(id) {
    const existingItem = shoppingcartItems.find(entry => entry.id === id)
    if (existingItem == null) return
    shoppingcartItems = shoppingcartItems.filter(entry => entry.id !== id)
    renderCart()
}

function renderCartItem() {
    cartItemQua.innerText = shoppingcartItems.length

    const price = shoppingcartItems.reduce((sum, entry) => {
        const item = items.find(i => entry.id === i.id)
        return sum + item.priceCents * entry.quantity
    }, 0)
    cartTotalPrice.innerText = textToCurrency(price / 100)
    cartItems.innerHTML = ""

    shoppingcartItems.forEach(entry => {
        const item = items.find(i => entry.id === i.id)
        const cartItem = cartItemsTemplate.content.cloneNode(true)

        const container= cartItem.querySelector("[data-item]")
        container.dataset.itemId=item.id

        const itemImage = cartItem.querySelector("[cart-item-img]")
        itemImage.src = `${IMG_URL}/${item.imageColor}/${item.imageColor}`

        const itemName = cartItem.querySelector("[cart-item-name]")
        itemName.innerText = item.name

        const itemQuantity = cartItem.querySelector("[cart-item-quantity]")
        itemQuantity.innerText = `x${entry.quantity}`

        const itemPrice = cartItem.querySelector("[cart-item-price]")
        itemPrice.innerText = textToCurrency(item.priceCents * entry.quantity / 100)

        cartItems.appendChild(cartItem)

    })
}