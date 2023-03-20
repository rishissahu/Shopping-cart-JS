import items from "./items.json"
const cartBtn = document.querySelector("[cart-button]")
const cartItemWrapper = document.querySelector("[cart-items-wrapper]")
const cartitems = document.querySelector("[cart-items]")
import { textToCurrency } from "./utils/currencyFormate.js"
const cartItemsTemplate = document.querySelector("#cart-item")
let shoppingCartItems = []
const IMG_URL = "https://dummyimage.com/210x130"
const cartItemQua = document.querySelector("[cart-item-total-quantity]")
const cartItemValue = document.querySelector("[cart-item-price ]")


export function setupShoppingCart() { }

cartBtn.addEventListener('click', () => {
    cartItemWrapper.classList.toggle("invisible")
})

export function addToCart(id) {
    const itemPresent = shoppingCartItems.find(entry => entry.id === id)
    if (itemPresent) {
        itemPresent.quantity++
    }
    else {
        shoppingCartItems.push({ id: id, quantity: 1 })
    }
    renderCartItem()
}

function renderCartItem() {
    cartItemQua.innerText = shoppingCartItems.length

    const price = shoppingCartItems.reduce((sum, entry) => {
        const item = items.find(i => entry.id === i.id)
        return sum + item.priceCents * item.quantity
    }, 0)
    console.log(price)

        // cartItemValue.innerText = textToCurrency()

    cartitems.innerHTML = ""

    shoppingCartItems.forEach(entry => {
        const item = items.find(i => entry.id === i.id)
        const cartItem = cartItemsTemplate.content.cloneNode(true)

        const itemImage = cartItem.querySelector("[cart-item-img]")
        itemImage.src = `${IMG_URL}/${item.imageColor}/${item.imageColor}`

        const itemName = cartItem.querySelector("[cart-item-name]")
        itemName.innerText = item.name

        const itemQuantity = cartItem.querySelector("[cart-item-quantity]")
        itemQuantity.innerText = `x${entry.quantity}`

        const itemPrice = cartItem.querySelector("[cart-item-price]")
        itemPrice.innerText = textToCurrency(item.priceCents * entry.quantity / 100)

        cartitems.appendChild(cartItem)

    })


}