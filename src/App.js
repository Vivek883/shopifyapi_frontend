import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure to create this file for styling

const App = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showVariants, setShowVariants] = useState({});
  const [searchQuery, setSearchQuery] = useState(''); // Initialize searchQuery state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3400/getdata');
        setProducts(response.data.products);
      } catch (err) {
        setError(err);
      }
    };

    fetchProducts();
  }, []);

  const toggleShowVariants = (productId) => {
    setShowVariants((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <nav className="navbar">
        <img src="https://messold.com/data/img/messold-logo.png" alt="Logo" class="logo" />
        <input type="text" className="search-box" placeholder="Search products..." value={searchQuery} onChange={handleSearch} />
      </nav>

      <h1><strong><b>SHOPIFY PRODUCTS</b></strong></h1>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image ? product.image.src : 'https://messold.com/data/img/messold-logo.png'} alt={product.title} />
            <h2>{product.title}</h2>
            <p><b>Category</b>: {product.product_type}</p>
            <p><b>Product ID</b>: {product.id}</p>
            <p><b>Tags</b>: {product.tags}</p>           
            {showVariants[product.id] && (
              <div>
                <h3><b>Variants</b>:</h3>
                <ul>
                  {product.variants.map((variant) => (
                    <li key={variant.id}>
                      <p><b>Variant ID</b>: {variant.id}</p>
                      <p><b>Title</b>: {variant.title}</p>
                      <p><b>Price</b>: {variant.price}</p>
                      <p><b>Compared Price</b>: {variant.compare_at_price}</p>
                      <p><b>SKU</b>: {variant.sku}</p>
                      <p><b>Quantity</b>: {variant.inventory_quantity}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              className="toggle-variants-button"
              onClick={() => toggleShowVariants(product.id)}
            >
              {showVariants[product.id] ? 'Hide Variants' : 'Show Variants'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;


