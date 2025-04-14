import React from 'react';

const sampleProducts = [
  { id: 1, name: 'Milk', price: 1.20, category: 'Dairy' },
  { id: 2, name: 'Bread', price: 0.95, category: 'Bakery' },
  { id: 3, name: 'Eggs', price: 2.10, category: 'Dairy' },
  { id: 4, name: 'Tomatoes', price: 0.75, category: 'Produce' },
  // Add more products as needed
];

function ProductGrid({ onProductSelect }) {
  return (
    <div className="product-grid">
      <h2>Products</h2>
      <div className="grid">
        {sampleProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>€{product.price.toFixed(2)}</p>
            <button onClick={() => onProductSelect(product)}>
              Add to List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;