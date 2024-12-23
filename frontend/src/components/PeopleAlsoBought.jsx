import { useEffect } from "react"
import useProductStore from "../store/useProductStore"
import ProductCard from "./ProductCard"
import Loader from '../components/Loader'

const PeopleAlsoBought = () => {
  const {recommendedProducts,getRecommendatedProduct,loading} = useProductStore()
  useEffect(() => {
    getRecommendatedProduct();
  },[])
  if(loading){
    return <Loader/>
  }
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-emerald-400">
        People also bought
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendedProducts.map(product => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default PeopleAlsoBought