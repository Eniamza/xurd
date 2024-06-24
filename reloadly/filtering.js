const {getProductsbyBrandName} = require('./assets.js')

async function showAvailableCountries(availableProducts) {

    let countries = []

    let productArray = availableProducts.content

    productArray.forEach(product => {
        let countryfull = `**${product.country.isoName}** >${product.country.name}`
        countries.push(countryfull)
    })



    let uniqueCountries = [...new Set(countries)]

    return uniqueCountries

}

module.exports = {showAvailableCountries}