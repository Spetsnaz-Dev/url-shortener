const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser : true, useUnifiedTopology : true
})

// set view type to ejs
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : false }))

// render app
app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls : shortUrls })
})

app.post('/shortUrls', async(req, res) => {
    await ShortUrl.create({ full : req.body.fullUrl })
    res.redirect('/')
})

app.get('/:shortUrl', async(req, res) => {
    const shortUrl = await ShortUrl.findOne({ short : req.params.shortUrl })

    if(shortUrl == null)
        return res.sendStatus(404)
    
    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

// Host Port 
app.listen(process.env.PORT || 5000);