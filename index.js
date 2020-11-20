import { testPurses } from "./shortChangeTests.js"

const getElement = (selector) => document.querySelector(selector)

const purchaseConfirmation = getElement("#purchase-confirmation")
const quarterCounter = getElement("#quarter-count")
const dimeCounter = getElement("#dime-count")
const nickelCounter = getElement("#nickel-count")
const pennyCounter = getElement("#penny-count")
const previousBtn = getElement("#previous-case")
const nextBtn = getElement("#next-case")

let currentTest = 0
previousBtn.disabled = true

const enoughChange = ({ quarters, dimes, nickels, pennies, price }) => {
    
    quarterCounter.textContent = quarters
    dimeCounter.textContent = dimes
    nickelCounter.textContent = nickels
    pennyCounter.textContent = pennies
    
    const TotalPurse = (0.25 * quarters + 0.10 * dimes + 0.05 * nickels + 0.01 * pennies).toFixed(2)
    
    const isEnoughChange = price <= TotalPurse
    
    purchaseConfirmation.style.background = isEnoughChange ? "green" : "red"
    
    purchaseConfirmation.textContent = `With $${TotalPurse} in coins, you ${isEnoughChange ? "can" : "cannot"} afford this $${price} purchase${isEnoughChange ? " 😊" : " 😔"}`
}

enoughChange(testPurses[currentTest])

const handleClick = (offset) => {
    currentTest += offset
    enoughChange(testPurses[currentTest])
    
    previousBtn.disabled = currentTest === 0
    nextBtn.disabled = currentTest === 4
}

previousBtn.addEventListener("click", () => handleClick(-1))
nextBtn.addEventListener("click", () => handleClick(1))
