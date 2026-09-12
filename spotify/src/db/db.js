const mongoose=require('mongoose')
require('dotenv').config()

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected successfully ✅")
    }catch(err){
        console.error('Database connection error : ',err)
    }
    
}

module.exports=connectDB