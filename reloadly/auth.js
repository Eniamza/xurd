const ax = require('axios');

async function reloadlyAuth(){

    let authURL = "https://auth.reloadly.com/oauth/token"

    const response = await ax.post(authURL, {
        client_id: process.env.RELOADLY_CLIENT_ID,
        client_secret: process.env.RELOADLY_CLIENT_SECRET,
        grant_type: "client_credentials",
        audience: `${process.env.RELOADLY_SANDBOX}`
    })

    console.log(`Auth Success`,Date.now())
    return response.data

}

module.exports = {reloadlyAuth}