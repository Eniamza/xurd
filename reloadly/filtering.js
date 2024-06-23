const {getProductsbyBrandName} = require('./assets.js')

async function showAvailableCountries(availableProducts) {

    let countries = []

    let productArray = availableProducts.content

    console.log(productArray.length)

    productArray.forEach(product => {
        countries.push(product.country.isoName)
    })

    let uniqueCountries = [...new Set(countries)]

    console.log(uniqueCountries)

    return uniqueCountries

}

module.exports = {showAvailableCountries}