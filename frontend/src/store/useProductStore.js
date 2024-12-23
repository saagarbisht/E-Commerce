import { create } from "zustand";
import toast from "react-hot-toast";
import axios from '../lib/axios'

const useProductStore = create((set) => ({
  products:[],
  recommendedProducts:[],
  loading:false,
  setProducts:(products) => set({products}),
  createProduct:async (productData) => {
    set({loading:true});
    try {
      const res = await axios.post('/product',productData);
      set((state) => ({
        products:[...state.products,res.data],
        loading:false,
      }))
      toast.success('Product added successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to upload data');
      set({loading:false})
    }
  },
  fetchAllProducts:async() => {
    set({loading:true});
    try {
      const response = await axios.get("/product");
      set({products:response.data.products,loading:false})
    } catch (error) {
      toast.error(error.response?.data?.error || 'failed to fetch products');
      set({loading:false})
    }
  },
  getRecommendatedProduct:async() => {
    set({loading:true})
    try {
      const res = await axios.get('/product/recommendations')
      set({recommendedProducts:res.data,loading:false})
    } catch (error) {
      toast.error(error.response?.data?.error || 'failed to fetch recommended products');
      set({loading:false})
    }
  },
  deleteProducts:async(id) => {
    set({loading:true})
    try {
      const response = await axios.delete(`/product/${id}`)
      set((prevProducts) => ({
        products:prevProducts.products.filter((product => (product._id !== id ))),
        loading:false,
      }))
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.error || 'failed to fetch products');
      set({loading:false})
    }
  },
  toggleFeaturedProducts:async(id) => {
    set({loading:true})
    try {
      const response = await axios.patch(`/product/${id}`)
      set((prevProducts) => ({
        products:prevProducts.products.map((product => (product._id === id ? {...product, isFeatured:response.data.isFeatured} : product))),
        loading:false,
      }))
      
    } catch (error) {
      toast.error(error.response?.data?.error || 'failed to fetch products');
      set({loading:false})
    }
  },
  fetchProductsByCategory:async(category) => {
    set({loading:true});
    try {
      const response = await axios.get(`/product/category/${category}`)
      set({products:response.data.products,loading:false})
    } catch (error) {
      set({loading:false})
      toast.error(error.response?.data?.error || 'failed to fetch products');
    }
  },
  fetchFeaturedProducts:async() => {
    set({loading:true});
    try{
      const res = await axios.get("/product/featured");
      set({products:res.data,loading:false})
    }catch(error){
      console.log(error)
      set({error:'Faliled to fetch products',loading:false})
    }
  }
}))

export default useProductStore