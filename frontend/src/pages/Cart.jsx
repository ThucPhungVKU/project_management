import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((state) => state.cart);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="mt-4 text-gray-500">
            Start shopping to add items to your cart
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.id} className="p-6">
              <div className="flex items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        ${item.product.price}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center border rounded">
                        <button
                          className="px-3 py-1 hover:bg-gray-100"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          className="px-3 py-1 hover:bg-gray-100"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between text-lg font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Link
          to="/checkout"
          className="mt-6 block w-full bg-blue-600 text-white text-center py-3 rounded-md hover:bg-blue-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
} 