import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productApi, cartApi } from '../services/api';
import defaultProductImage from '../assets/default-product';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://localhost:8000'; // Remove /api from here

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await cartApi.addItem({ product_id: id, quantity: 1 });
      // Show success message or update cart count
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const imageUrl = product.image 
    ? `${BASE_URL}${product.image}` // This will correctly form the URL
    : defaultProductImage;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full rounded-lg object-cover"
            onError={(e) => {
              if (e.target.src !== defaultProductImage) {
                e.target.src = defaultProductImage;
              }
            }}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-4 text-2xl font-bold">${product.price}</p>
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}