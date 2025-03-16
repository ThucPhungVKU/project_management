import { Link } from 'react-router-dom';

const DEFAULT_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const BASE_URL = 'http://localhost:8000';

export default function ProductCard({ product }) {
  // Remove the BASE_URL from the image path if it exists
  const imageUrl = product.image 
    ? product.image.startsWith('http') 
      ? product.image 
      : `${BASE_URL}${product.image}`
    : DEFAULT_IMAGE;

  return (
    <div className="group relative">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-64 w-full object-cover object-center group-hover:opacity-75"
          onError={(e) => {
            if (e.target.src !== DEFAULT_IMAGE) {
              e.target.src = DEFAULT_IMAGE;
            }
          }}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/products/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category_name}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
    </div>
  );
}