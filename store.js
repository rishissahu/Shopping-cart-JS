import items from "./items.json"
import { textToCurrency } from "./utils/currencyFormate.js"
import { addToCart } from './shoppingCart.js'
const dataTemplate = document.querySelector("#store-item-temp")
const item_container = document.querySelector("#wrapper")
const IMG_URL = "https://dummyimage.com/420x260"

export function setupStore() {
    items.forEach(renderStoreItems)
}

export function addBtnEvent() {
    document.addEventListener('click', e => {
        if (e.target.matches("[data-add-to-cart-btn]")) {
            const id = e.target.closest("[data-store-item]").dataset.itemId
            addToCart(parseInt(id))
        }
    })
}

function renderStoreItems(item) {
    const storeItem = dataTemplate.content.cloneNode(true)

    const container = storeItem.querySelector("[data-store-item]")
    container.dataset.itemId = item.id

    const name = storeItem.querySelector("[data-name]")
    name.innerText = item.name

    const category = storeItem.querySelector("[data-category]")
    category.innerText = item.category

    const image = storeItem.querySelector("[data-image]")
    image.src = `${IMG_URL}/${item.imageColor}/${item.imageColor}`

    const price = storeItem.querySelector("[data-price]")
    price.innerText = textToCurrency(item.priceCents / 100)

    item_container.appendChild(storeItem)
}