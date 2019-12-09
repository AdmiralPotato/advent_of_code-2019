const fs = require('fs')
const dataPath = './01-input.txt'
let input = fs.readFileSync(dataPath, 'utf8')
const getFuelByMass = (mass) => {
    return Math.max(0, Math.floor(mass / 3) - 2)
}

//console.log(input)
const massList = input.split('\n').filter((item) => {
    return !!item
})
let fuelForModules = 0
const fuelForModulesList = massList.map((mass) => {
    const fuel = getFuelByMass(mass)
    fuelForModules += fuel
    return fuel
})
console.log(fuelForModulesList)
console.log('total fuel needed for modules:', fuelForModules)

const getFuelForFuel = (fuel) => {
    let total = fuel
    let lastTotal = fuel
    while (lastTotal > 0) {
        lastTotal = getFuelByMass(lastTotal)
        total += lastTotal
    }
    return total
}
let totalFuel = 0
const fuelForFuelList = fuelForModulesList.map((mass) => {
    const fuel = getFuelForFuel(mass)
    totalFuel += fuel
    return fuel
})

console.log(fuelForFuelList)
console.log('total fuel needed for modules + fuel:', totalFuel)
