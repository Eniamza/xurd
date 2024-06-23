const ax = require('axios');
const {reloadlyAuth} = require('./auth.js')

async function getProductsbyBrandName(brandName) {
    
    try {

        const session = await reloadlyAuth()
        const token = session.access_token

        const headers = {
            Accept: 'application/com.reloadly.giftcards-v1+json',
            Authorization: `Bearer ${token}`,
          }

          let uriEncodedBrand = encodeURIComponent(brandName)

        const url = `${process.env.RELOADLY_SANDBOX}//products?size=&page=&productName=${uriEncodedBrand}&countryCode=&productCategoryId=&includeRange=true&includeFixed=true`

        const response = await ax.get(url, {headers: headers})

        console.log(`Products by Brand Name: ${brandName}`,Date.now())

        return response.data

        
    } catch (error) {
        console.log(error)
    }

}

module.exports = {getProductsbyBrandName}