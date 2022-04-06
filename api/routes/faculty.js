const express = require("express");

const router = express.Router()

router.get('/',(req,res,next) => {
    res.status(200).json({
        message:"this is a get faculty"
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message : 'this is a post faculty'
    })
})
module.exports = router