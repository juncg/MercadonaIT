import React from 'react';

function ShoppingList({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="shopping-list">
      <h2>Shopping List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - €{item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <div className="total">
        <strong>Total: €{total.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default ShoppingList;