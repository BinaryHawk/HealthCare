const express = require("express")
const router = express.Router()

router.get('/', (req,res) => {
    res.send('perfectly working')
})

module.exports = router