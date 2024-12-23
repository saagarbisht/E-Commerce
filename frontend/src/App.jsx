import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import Loader from "./components/Loader";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import useCartStore from './store/useCartStore'
import PurchaseSuccessPage from './pages/PurchaseSuccessPage'
import PurchaseCancelPage from './pages/PurchaseCancelPage'
import Lost from "./pages/Lost";

const App = () => {
  const {user,checkAuth,checkingAuth} = useUserStore()
  const {getCartItems} = useCartStore();
  useEffect(() => {
    checkAuth()
  } ,[checkAuth])
  useEffect(() => {
    if(!user) return;
    getCartItems()
  },[user])

  if(checkingAuth) {
    return (
      <Loader/>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]"/>
        </div>
      </div>
        <div className="relative z-10000 pt-12">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={user ?  <Navigate to='/'/> : <Signup />} />
            <Route path="/login" element={user ? <Navigate to='/'/> : <Login />} />
            <Route path="/secret-dahboard" element={user?.role === 'admin' ? <AdminPage /> : <Navigate to='/login' />} />
            <Route path="/category/:category" element={<CategoryPage/>}/>
            <Route path="/cart" element={user ? <CartPage/> : <Navigate to='/login'/>}/>
            <Route path="/purchase-success" element={<PurchaseSuccessPage/>}/>
            <Route path="/purchase-cancel" element={<PurchaseCancelPage/>}/>
            <Route path="*" element={<Lost/>}/>
          </Routes>
        </div>
        <Toaster/>
      </div>
  );
};

export default App;
