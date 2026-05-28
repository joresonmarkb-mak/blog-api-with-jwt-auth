import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({

    name:{
        type:String,
        required: true,
        lowercase:true,
        minLenght:1,
        maxLenght:30
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLenght:1,
        maxLenght:150
    },
    age:{
        type:Number,
        required:true
    },

},

{timestamps:true}

)

userSchema.pre ("save", async function (next){if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}


export const User = mongoose.model("User",userSchema);