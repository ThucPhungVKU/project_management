import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../store/slices/orderSlice';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, total } = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    shipping_address: '',
    phone_number: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      ...formData,
      items: cartItems.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      })),
      total_amount: total
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.product.name} x {item.quantity}</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="shipping_address">
            Shipping Address
          </label>
          <textarea
            id="shipping_address"
            name="shipping_address"
            value={formData.shipping_address}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md px-3 py-2"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone_number">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
} 