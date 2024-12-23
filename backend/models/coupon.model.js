import {Schema,model} from 'mongoose'

const couponSchema = new Schema({
  code:{
    type:String,
    required:true,
    unique:true
  },
  discountPercentage:{
    type:Number,
    required:true,
    min:0,
    max:100
  },
  expirationDate:{
    type:Date,
    require:true
  },
  isActive:{
    type:Boolean,
    default:true
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    require:true,
    unique:true
  }
},{timestamps:true})

const Coupon = model('Coupon',couponSchema)

export default Coupon