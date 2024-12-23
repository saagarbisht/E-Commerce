import Product from '../models/product.model.js'
import {redis} from '../lib/redis.js'
import cloudinary from '../lib/cloudinary.js'

const updateFeaturedProductsCache = async () => {
  try {
    const featuredProducts = await Product.find({isFeatured:true})
    await redis.set('featured_products',JSON.stringify(featuredProducts))
  } catch (error) {
    console.log("Error in updating featured products in cache")
  }
}

export const getAllProducts = async (req,res) => {
  try {
    const products = await Product.find({})
    return res.status(200).json({products})
  } catch (error) {
    return res.status(500).json({message:'Server error',error:error.message})
  }
}

export const getFeaturedProducts = async (req,res) => {
  try {
    let featuredProducts = await redis.get('featured_products')
    if(featuredProducts){
      return res.status(200).json(JSON.parse(featuredProducts))
    }
    featuredProducts = await Product.find({isFeatured : true}).lean();
    if(!featuredProducts){
      return res.status(404).json({message:'No feature products found'})
    }
    await redis.set('featured_products',JSON.stringify(featuredProducts))
    res.status(200).json(featuredProducts)
  } catch (error) {
    return res.status(500).json({message:'Server Error',error:error.message})
  }
}

export const createProduct = async (req,res) => {
  try {
    const {name,description,price,image,category} = req.body;
    let cloudinaryResponse = null;
    if(image){
      cloudinaryResponse = await cloudinary.uploader.upload(image,{folder:'products'})
    }
    const newProduct = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
      category
    })
    return res.status(201).json(newProduct)
  } catch (error) {
    return res.status(500).json({message:'Server error',error:error.message})
  }
}

export const deleteProduct = async (req,res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product){
      return res.status(404).json({message:'Produt not found'})
    }
    if(product.image){
      const publicId = product.image.split("/").pop().split(".")[0]
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`)
      } catch (error) {
        console.log('Cloudinary image destroy error. ',error.message)
      }
    }
    return res.status(202).json({message:'Product deleted successfully'})
  } catch (error) {
    return res.status(500).json({message:'Server error',error:error.message})
  }
}

export const getRecommendeddProducts = async (req,res) => {
  try {
    const recommendedProducts = await Product.aggregate([
      {
        $sample:{size:3}
      },
      {
        $project:{
          _id:1,
          name:1,
          description:1,
          image:1,
          price:1
        }
      }
    ])
    return res.status(200).json(recommendedProducts)
  } catch (error) {
    return res.status(500).json({message:'Server error',error:error.message})
  }
  
}

export const getProductsByCategory = async (req,res) => {
  const {category} = req.params;
  try {
    const products = await Product.find({category})
    return res.status(200).json({products})
  } catch (error) {
    return res.status(500).json({message:'Server error',error:error.message})
  }

}

export const toggleFeaturedProducts = async (req,res) => {
  const {id} = req.params
  try {
    const product = await Product.findById(id)
    if(!product){
      return res.status(404).json({message:'Product not found'})
    }
    product.isFeatured = !product.isFeatured
    const updatedProduct = await product.save()
    await updateFeaturedProductsCache();
    return res.status(200).json(updatedProduct)
  } catch (error) {
    return res.status(500).json({message:'Server error',error:error.message})
  }
}