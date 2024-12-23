import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem"
import useProductStore from "../store/useProductStore"
import FeaturedProducts from '../components/FeaturedProducts'
const categories =[
  {href:'/jeans',name:'Jeans',imageUrl:'/jeans.jpg'},
  {href:'/t-shirts',name:'T-Shirt',imageUrl:'/tshirts.jpg'},
  {href:'/shoes',name:'Shoes',imageUrl:'/shoes.jpg'},
  {href:'/glasses',name:'Glasses',imageUrl:'/glasses.png'},
  {href:'/jackets',name:'Jackets',imageUrl:'/jackets.jpg'},
  {href:'/suits',name:'Suits',imageUrl:'/suits.jpg'},
  {href:'/bags',name:'Bags',imageUrl:'/bags.jpg'},
]
const Home = () => {
  const {loading,products,fetchFeaturedProducts} = useProductStore();
  useEffect(() => {
    fetchFeaturedProducts();
  },[fetchFeaturedProducts])
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400">Explore Our Categories</h1>
        <p className="text-center text-lg sm:text-xl text-gray-300 mb-12 py-4">Discover the latest trends in eco-friendly fashion</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            categories.map((category,index) => (
              <CategoryItem  
              category = {category}
              key = {index}
              />
            ))
          }
        </div>
        {!loading && products.length > 0 && <FeaturedProducts featuredProducts={products}/>}
      </div>
    </div>
  )
}

export default Home