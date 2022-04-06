const express = require('express')
const mongoose = require('mongoose')
const Product = require('../model/product')
const CheckAuth = require('../middleware/check-auth')

const router = express.Router()



router.get('/',CheckAuth,(req,res,next)=>{
   Product.find()
   .then(result=>{
       res.status(200).json({
           ProductData:result
       })
   })

   .catch(err1=>{
      res.status(500).json({
           error:err1
       })
   })
})

router.get('/:id',(req,res,next)=>{
    Product.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            ProductData:result
        })
    })
 
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })

})

//delete
router.delete('/:id',(req,res,next)=>{
    Product.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:"Product deleted",
            ProductData:result
        })
    })
 
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//update
router.put('/:id',(req,res,next)=>{
    Product.findOneAndUpdate({_id:req.params.id},{
        $set:{
            code:req.body.code,
            title:req.body.title,
            description:req.body.description,
            mrp:req.body.mrp,
            sp:req.body.sp,
            discountPercent:req.body.discountPercent,
            imagePath:req.body.imagePath

        }
    })
    .then(result=>{
        res.status(200).json({
            message:"Product updated",
            ProductData:result
        })
    })
 
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.post('/',(req,res,next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        code:req.body.code,
        title:req.body.title,
        description:req.body.description,
        mrp:req.body.mrp,
        sp:req.body.sp,
        discountPercent:req.body.discountPercent,
        imagePath:req.body.imagePath
    })

    product.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newProduct:result
        })
    })

    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })

    })
    
})

module.exports = router