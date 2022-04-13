const express = require('express')
const cors = require('cors')

const app = new express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use(require('./Routes/login'))

app.listen(port , () => {
    console.log('Server is runnung on port '+port)
})
