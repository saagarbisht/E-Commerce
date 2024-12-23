import {motion} from 'framer-motion';
import useCartStore from '../store/useCartStore';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import axios from '../lib/axios';
import { useState } from 'react';
import {toast} from 'react-hot-toast'
import Loader from '../components/Loader'

const stripePromise = loadStripe("pk_test_51QLcDoAk8nj2KzhPoAClPpv8fSj3zXSpOzR1EpVJMmvAoj3Te0b9rpmBFjMRalDHBYAxms2LthCVMFqiVv9vdtfe00BvcYN4SK")

const OrderSummary = () => {
  const [loading,setLoading] = useState(false);
  const {cart,total,subtotal,coupon,isCouponApplied} = useCartStore();
  const saving = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedtotal = total.toFixed(2);
  const formattedSaving = saving.toFixed(2);
  async function handleStipePayment(){
    setLoading(true)
    try {
      const stripe = await stripePromise;
      const res = await axios.post('payment/create-checkout-session',{products:cart,couponCode:coupon ? coupon.code : null})
      const session = res.data;
      const result = await stripe.redirectToCheckout({
        sessionId:session.id
      })
      if(result.error)throw error;
    } catch (error) {
      toast.error('unable to continue payment')
    }finally{
      setLoading(false)
    }

  }
  if(loading){
    return <Loader/>
  }
  return (
    <motion.div
    className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    >
      <p className='text-xl font-semibold text-emerald-400'>Order summary</p>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <dl className='flex items-center justify-between gap-4'>
            <dt className='text-base font-normal text-gray-300'>Original price</dt>
            <dd className='text-base font-medium text-white'>Rs. {formattedSubtotal}</dd>
          </dl>
          {saving > 0 && (
            <dl className='flex items-center justify-between gap-4'>
            <dt className='text-base font-normal text-gray-300'>Saving</dt>
            <dd className='text-base font-medium text-white'>Rs. {formattedSaving}</dd>
          </dl>
          )}
          {
            coupon && isCouponApplied && (
              <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-gray-300'>Coupon ({coupon.code})</dt>
              <dd className='text-base font-medium text-emerald-400'>-{coupon.discountPercentage}%</dd>
            </dl>
            )
          }
            <dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
              <dt className='text-base font-bold text-white'>Total</dt>
            <dd className='text-base font-bold text-emerald-400'>Rs. {formattedtotal}</dd>
          </dl>
        </div>
        <motion.button
        className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        onClick={handleStipePayment}
        >
          Proceed to Checkout
        </motion.button>
        <div className='flex items-center justify-center gap-2'>
          <span className='text-sm font-normal text-gray-400'>or</span>
          <Link 
          to='/'
          className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
          >
          Continue Shopping
          <MoveRight size={16}/>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default OrderSummary