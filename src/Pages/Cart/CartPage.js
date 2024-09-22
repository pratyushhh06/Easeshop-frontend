import React from 'react'
import { useCart } from '../../Context/cart'
import { useAuth } from '../../Context/auth'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const CartPage = () => {
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  const totalPrice = () => {
    try {
      let total = 0
      cart?.map(item => {
        total = total + item.price
      })
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    } catch (error) {
      console.log(error)
    }
  }

  const removeCartItem = pid => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex(item => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem('cart', JSON.stringify(myCart))
    } catch (error) {
      console.log(error)
    }
  }

  const handlePayment = async () => {
    const stripe = await loadStripe(
      'pk_test_51PxBmGRwJ2CjAvUbXN9PWbyGTeGEYYIcvZLGtJ9xK3yVbBb6zuhqb9Pr1dHsYNQl0ZhDqTyRPRYIJrf4igzUnjb8009vvvSE22'
    )
    const body = {
      products: cart
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/payment/create-session',
        body,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const session = response.data
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      })
      if (result.error) {
        console.error(result.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='text-center bg-light p-2 mb-4 text-info'>
            {`Hello, ${auth?.token && auth?.user.name}`}
          </h1>
          <h4 className='text-center'>
            {cart?.length > 0
              ? `You have ${cart.length} item(s) in your cart ${
                  auth?.token ? '' : 'Please login to checkout'
                }`
              : 'Your cart is empty'}
          </h4>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-8'>
          {cart?.map(p => (
            <div className='card mb-3' key={p._id}>
              <div className='row g-0'>
                <div className='col-md-4'>
                  <img
                    src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                    className='img-fluid rounded-start'
                    alt={p.name}
                  />
                </div>
                <div className='col-md-8'>
                  <div className='card-body'>
                    <h5 className='card-title'>{p.name}</h5>
                    <p className='card-text'>{p.description}</p>
                    <p className='card-text'>
                      <small className='text-muted'>Price: ${p.price}</small>
                    </p>
                    <button
                      className='btn btn-danger'
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='col-md-4'>
          <div className='card'>
            <div className='card-body text-center'>
              <h2 className='card-title'>Cart Summary</h2>
              <p className='card-text'>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>

              {auth?.user?.address ? (
                <>
                  <h5>Current Address:</h5>
                  <p>{auth?.user?.address}</p>
                  <button
                    className='btn btn-outline-warning'
                    onClick={() => navigate('/dashboard/user/profile')}
                  >
                    Update Address
                  </button>
                </>
              ) : (
                <div className='mt-3 text-center'>
                  {auth?.token ? (
                    <button
                      className='btn btn-outline-warning'
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className='btn btn-outline-warning'
                      onClick={() =>
                        navigate('/login', { state: '/cart' })
                      }
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={handlePayment}
                className='btn btn-outline-warning mt-3 w-100'
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
