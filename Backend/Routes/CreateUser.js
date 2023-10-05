const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const jwtSecret = "Hello mynameisashutoshsinghtomar"
const newOrder = require('../models/User')

router.post("/createUser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                location: req.body.location,
                email: req.body.email
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })],

     async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })}
        let email = req.body.email;
        try {
           let userData =  await User.findOne({email});
           if(!userData)
           {
            return res.status(400).json({errors:"Try logging with the correct credentials"})
           }
           const pwdCompare = bcrypt.compare(req.body.password,userData.password);
           if(!pwdCompare)
           {
            return res.status(400).json({errors:"Try with correct credentials"});
           }

           const datas ={
            user:{
                id:userData.id
            }
           }

           const authToken = jwt.sign(datas,jwtSecret)
           return res.json({success:true , authToken})
        } catch (error) {
            console.log(error)
            res.json({ success: fnwjfweofeopk });
        }
    })

    router.post('/orderData', async (req, res) => {
        let data = req.body.order_data
        await data.splice(0,0,{Order_date:req.body.order_date})
        console.log("1231242343242354",req.body.email)
    
        //if email not exisitng in db then create: else: InsertMany()
        let eId = await newOrder.findOne({ 'email': req.body.email })    
        console.log(eId)
        if (eId===null) {
            try {
                console.log(data)
                console.log("1231242343242354",req.body.email)
                await Order.create({
                    email: req.body.email,
                    order_data:[data]
                }).then(() => {
                    res.json({ success: true })
                })
            } catch (error) {
                console.log(error.message)
                res.send("Server Error", error.message)
    
            }
        }
    
        else {
            try {
                await Order.findOneAndUpdate({email:req.body.email},
                    { $push:{order_data: data} }).then(() => {
                        res.json({ success: true })
                    })
            } catch (error) {
                console.log(error.message)
                res.send("Server Error", error.message)
            }
        }
    })



module.exports = router;