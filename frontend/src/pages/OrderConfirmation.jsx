import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function OrderConfirmation() {
  const { currentOrder } = useSelector((state) => state.orders);

  if (!currentOrder) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <CheckCircleIcon className="mx-auto h-12 w-12 text-green-600" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Thank you for your order. Your order number is #{currentOrder.id}
        </p>
      </div>

      <div className="mt-12 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        
        <div className="border-t border-gray-200 pt-4">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 flex justify-between">
              <dt className="text-gray-600">Order Status</dt>
              <dd className="font-medium text-gray-900">{currentOrder.status}</dd>
            </div>
            <div className="py-4 flex justify-between">
              <dt className="text-gray-600">Total Amount</dt>
              <dd className="font-medium text-gray-900">
                ${currentOrder.total_amount.toFixed(2)}
              </dd>
            </div>
            <div className="py-4">
              <dt className="text-gray-600">Shipping Address</dt>
              <dd className="mt-1 text-gray-900">{currentOrder.shipping_address}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/orders"
          className="text-blue-600 hover:text-blue-800"
        >
          View All Orders
        </Link>
      </div>
    </div>
  );
} 