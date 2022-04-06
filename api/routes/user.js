const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../model/user')
const bcryt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/signup',(req,res,next)=>{
    bcryt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else{
            const user  = new User({
                _id: new mongoose.Types.ObjectId,
                userName:req.body.userName,
                password:hash,
                phone:req.body.phone,
                email:req.body.email,
                userType:req.body.userType

            })
            user.save()
            .then(result=>{
                console.log(result);
                res.status(200).json({
                    newUser:result
                })
            })
        
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                })
        
            })
        }
    })
 
})

//login
router.post('/login',(req,res,next)=>{
User.find({userName:req.body.userName})
.exec()
.then(user=>{
    if(user.length<1){

        return res.status(404).json({
            msg:"user not found."
        })
    }
    bcryt.compare(req.body.password,user[0].password,(err,result)=>{
        if(!result){
            return res.status(404).json({
                msg:"password not match."
            })
        }
        if(result){
            const token = jwt.sign(
                {
                userName:user[0].userName,
                userType:user[0].userType,
                email:user[0].email,
                phone:user[0].phone
            },
            'secretKey',
            {
                expiresIn:'24h'
            }
            );
            res.status(200).json({
                userName:user[0].userName,
                userType:user[0].userType,
                email:user[0].email,
                phone:user[0].phone,
                token:token

            }
            )


        }
    })
})
.catch(err=>{
    res.status(500).json({
        err:err

    })
})




// })

// router.post('/login',(req,res,next)=>{
//     User.find({userName:req.body.userName})
//     .exec()
//     .then(user=>{
//         if(user.length < 1){
//             return res.status(401).json({
//                 msg:"user not found"
//             })
//         }
//         bcryt.compare(req.body.password,user[0].password,(err,result)=>{
//             if(!result){
//                 return res.status(401).json({
//                     msg:'password matching fail'
//                 })

//             }
//             if(result){
//                 const token = jwt.sign({
//                     userName:user[0].userName,
//                     userType:user[0].userType,
//                     email:user[0].userName,
//                     phone:user[0].userType,

//                 },
//                 'secretKey',
//                 {
//                     expiresIn:'24h'
//                 }
//                 );
//                 res.status(200).json({
//                     userName:user[0].userName,
//                     userType:user[0].userType,
//                     email:user[0].userName,
//                     phone:user[0].userType,
//                     token:token
                    
//                 })
//             }
//         })
//     })
//     .catch(err=>{
//         res.status(500).json({
//             err:err
//         })
//     })
})






module.exports = router