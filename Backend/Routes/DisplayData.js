const express = require('express')
const router = express.Router()
const connectToMongoDB = require('../db');

(async () => {
  try {
    const result = await connectToMongoDB(); // Fetch and receive the data

    router.post('/foodData',(req,res)=>{
        try{
    
            res.send(result);
        }
        catch(message){
             console.error(error.message);
             res.send("Server Error");
        }
    })
  } catch (error) {
    console.error('Error:', error);
  }
})();
//djnoie




module.exports = router;