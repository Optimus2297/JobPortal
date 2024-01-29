const express = require('express');
const router = express.Router()


router.get('/jobs', (req, res) => {
    res.setHeader('content-type','application/json')
    res.status(200).json({
        success : true,
        message : 'This route will display all jobs in future'
    })
})
module.exports = router;