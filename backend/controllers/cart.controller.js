import Product from '../models/product.model.js'

export const getCartProducts = async (req, res) => {
	try {
    const requiredProductIds = req.user.cartItems.map(item => item.product);
		const products = await Product.find({ _id: { $in: requiredProductIds } });
		const cartItems = products.map((product) => {
			const item = req.user.cartItems.find((cartItem) => cartItem.product.toString() === product._id.toString());
			return { ...product.toJSON(), quantity: item.quantity };
		});
		res.json(cartItems);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req,res) => {
  try {
    const {productId} = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find(item => item.product.toString() === productId);
    if(existingItem){
      existingItem.quantity += 1
    }else{
      user.cartItems.push({quantity:1,product:productId})
    }
    await user.save();
    return res.status(200).json(user.cartItems)
  } catch (error) {
    return res.status(500).json({message:'Server error',error:error.message})
  }
}

export const removeAllFromCart = async (req,res) => {
  try {
    const {productId} = req.body
    const user = req.user
    if(!productId){
      user.cartItems = []
    }else{
      user.cartItems = user.cartItems.filter(item => item.product.toString() !== productId.toString())
    }
    await user.save()
    return res.status(200).json(user.cartItems)
  } catch (error) {
    return res.status(500).json({message:'Server error',error:error.message})
  }
}

export const updateQuantity = async (req,res) => {
  try {
  const {id:productId} = req.params;
  const {quantity} = req.body
  const user = req.user
  const existingItem = user.cartItems.find(item => item.product.toString() === productId.toString())
  if(existingItem){
    if(existingItem.quantity === 0){
      user.cartItems = cartItems.filter(item => item.product.toString() !== productId.toSting())
      await user.save()
      return res.status(200).json(user.cartItems)
    }else{
      existingItem.quantity = quantity
      await user.save();
      return res.status(200).json(user.cartItems)
    }
  } else{
    return res.status(404).json({message:'Product not found'})
  }
  } catch (error) {
    return res.status(500).json({message:'Server error',error:error.message})
  }
}
