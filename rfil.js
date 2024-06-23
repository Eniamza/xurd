const riot = await Bun.file('riot.json').json()

//Getting array data from rfil.content

console.log(riot)

const data = riot.content

let countries = []

data.forEach(element => {

    if (!countries.includes(element.country.isoName)) {
        countries.push(element.country.isoName)
    }

    
});

console.log(countries)
console.log(countries.length)