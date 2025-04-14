import React, { useState } from 'react';
import ProductGrid from './components/ProductGrid';
import ShoppingList from './components/ShoppingList';
import Header from './components/Header';

function App() {
  const [shoppingList, setShoppingList] = useState([]);

  const addToList = (product) => {
    setShoppingList([...shoppingList, product]);
  };

  return (
    <div className="app">
      <Header />
      <main>
        <div className="container">
          <ProductGrid onProductSelect={addToList} />
          <ShoppingList items={shoppingList} />
        </div>
      </main>
    </div>
  );
}

export default App;