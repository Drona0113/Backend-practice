const mongoose=require('mongoose')
const bcrypt=require('bcrypt')


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required to create the user"],
        trim:true,
        lowercase:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"
        ],
        unique:[true,"Email already exists"],
    },
    
    name:{
        type:String,
        required:[true,"Name is required to create an account"]
    },

    password:{
        type:String,
        required:[true,"Password is required to create an account"],
        minlength:[6,"Password should contain more than 6 characters"],
        select:false,
    },

    systemUser:{
        type:Boolean,
        default:false,
        immutable:true,
        select:false
    }
},{
    timestamps:true
})


userSchema.pre("save",async function(){
    
    if(!this.isModified("password")){
        return  // use next() when the function is not async await
    }

    const hash=await bcrypt.hash(this.password, 10)
    this.password=hash

    return // use next when the function is not async await
})


userSchema.methods.comparePassword= async function (password){
    return await bcrypt.compare(password,this.password)
    
}

const userModel=mongoose.model("user",userSchema);


module.exports=userModel