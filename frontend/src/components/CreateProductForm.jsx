import { useState } from "react";
import { PlusCircle, Upload, Loader, Check } from "lucide-react";
import Input from "./Input";
import useProductStore from '../store/useProductStore'

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const {createProduct,loading} = useProductStore()
  function handleImageChange(e){
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();   
      reader.onloadend = () => {
        setNewProduct(prev => ({...prev,image:reader.result}))
      }
      reader.readAsDataURL(file);
    }
  }
  async function handleCreateProductForm(event) {
    event.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({name:'',description:'',category:'',price:'',image:''})
    } catch (error) {
      console.log('error creating a product')
    }
  }
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
        Create New Product
      </h2>
      <form onSubmit={handleCreateProductForm} className="space-y-6">

        <Input
          id="name"
          type="text"
          label="Product Name"
          value={newProduct.name}
          handleChange={(e) => {
            setNewProduct((prev) => ({ ...prev, name: e.target.value }));
          }}
        />

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            rows="3"
            required
            name="description"
            id="description"
            value={newProduct.description}
            onChange={(e) => {
              setNewProduct((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
            className="mt-1 block w-full bg-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          ></textarea>
        </div>

        <Input
          id="price"
          type="number"
          label="Price"
          value={newProduct.price}
          handleChange={(e) => {
            setNewProduct((prev) => ({ ...prev, price: e.target.value }));
          }}
        />

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={newProduct.category}
            onChange={(e) => {
              setNewProduct((prev) => ({ ...prev, category: e.target.value }));
            }}
            className="mt-1 block w-full bg-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            <option value="">Select a category</option>
            {
              categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            }
          </select>


        </div>

        <div className="flex items-center">
            <input type="file" id="image" onChange={handleImageChange} className="sr-only" accept="image/*"/>
            <label 
            htmlFor="image" 
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-500">
              <Upload className="h-5 w-5 inline-block mr-2"/>
              Upload Image
            </label>
            {newProduct.image && <span className="ml-3 text-sm text-gray-400"><Check className="h-10 w-10 text-green-500 animate-bounce"/></span>}
        </div>

        <div>
          <button 
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          disabled={loading}
          >
            {loading ? 
            (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden='true'/>
                Loading... 
              </>
            ):
            (
            <>  
              <PlusCircle className="mr-2 h-5 w-5"/>
              Create Product
            </>
            )
          }
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateProductForm;
