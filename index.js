const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())


// Get the URL that I want to scrap
const url = 'https://coinmarketcap.com/currencies/bitcoin/'

// Create the scrap function
const scrapData = async () => {
    try {
        const { data } = await axios.get(url)

        const $ = cheerio.load(data)

        const price = $('.nameSymbol')

        console.log(price.text())
    }
    catch (error) {
        console.log(error)
    }
}

// Invoke the function
scrapData()





app.get('/', (req, res) => {
    res.send('success')
})

app.listen(6000, () => console.log('Web Scrapper running on port 6000'))
