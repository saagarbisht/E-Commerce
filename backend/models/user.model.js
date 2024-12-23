import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
  name:{
    type:String,
    required:[true,'Name is required']
  },
  email:{
    type:String,
    required:[true,"Email is required"],
    unique:true,
    lowercase:true,
    trim:true
  },
  password:{
    type:String,
    required:[true,"Password is required"],
    minlength:[8,"Password must be at least 8 characters long"]
  },
  cartItems:[
    {
      quantity:{
        type:Number,
        default:1
      },
      product:{
        type: Schema.Types.ObjectId,
        ref:'Product'
      }
    }
  ],
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  }
},{timestamps:true})


// hook to hash password before saving to database
userSchema.pre('save',async function (next){
  if(!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
  } catch (error) {
    next(error)
  } 
})

// creating method to compare the password
userSchema.methods.comparePassword = async function (password){
  return await bcrypt.compare(password,this.password)
}

const User = model('User',userSchema)

export default User;