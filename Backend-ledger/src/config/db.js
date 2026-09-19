const mongoose=require('mongoose')

async function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected successfully✅");
    })
    .catch(err=>{
        console.log("Error connecting to DB❌");
        process.exit(1);// if server is not connected to DB then this shut downs the server.
    })
}

module.exports=connectDB