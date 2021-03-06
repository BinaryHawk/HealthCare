const express = require('express')
const cors = require('cors')

const app = new express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use(require('./Routes/login'))
app.use(require('./Routes/user'))
app.use(require('./Routes/emailValidation'))

app.listen(port , () => {
    console.log('Server is runnung on port '+port)
})
