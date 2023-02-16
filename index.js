const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())




// Create the scrap function
const scrapData = async () => {
    try {
        // Get the URL that I want to scrap
        const url = 'https://coinmarketcap.com/'
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const keys = [
            'rank',
            'name',
            'price',
            'hour',
            'day',
            'week',
            'marketCap',
            'volume',
            'circulatingSupply',
            'last7days'
        ]

        const coinArr = []

        $('#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div:nth-child(1) > div.sc-f7a61dda-2.efhsPu > table > tbody > tr').each((pI, pE) => {
            let keyIdx = 0
            const coinObj = {}

            // if (pI <= 9) {

            // }
            $(pE).children().each((cI, cE) => {
                let tdValue = $(cE).text()

                if (keyIdx === 1 || keyIdx === 6) {
                    tdValue = $('p:first-child', $(cE).html()).text();
                }

                if (tdValue) {
                    coinObj[keys[keyIdx]] = tdValue

                    keyIdx++
                }
            })
            coinArr.push(coinObj)
        })
        return coinArr
    }
    catch (error) {
        console.log(error)
    }
}

// Invoke the function
// scrapData()





app.get('/api/web-scrapping', async (req, res) => {
    try {
        const webScrapping = await scrapData()
        return res.status(200).json({
            result: webScrapping,
        })
    }
    catch (err) {
        return res.status(500).json({
            err: err.toString(),
        })
    }
})

app.listen(5500, () => console.log('Web Scrapper running on port 5500'))
