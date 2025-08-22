import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ProductList } from '../../components/products/ProductList';
import { Product } from '../../types/products/Product';
import axios from 'axios';

function ProductsPage() {
  const data = useLoaderData<Product[]>();
  const [filter, setFilterProducts] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(data);
  // Debounce timer
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  console.log(data);

  function handleEdit(product: Product) {
    navigate(`/produtos/${product.id}`);
  }

  async function handleDelete(productId: number) {
    const response = await axios.delete(`http://localhost:3001/api/product/${productId}`);
    if (response.status === 204 || response.status === 200) {
        alert(`Produto ${productId} excluído`);
        setFilteredProducts(filteredProducts.filter(product => product.id !== productId));
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFilterProducts(value);
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const timer = setTimeout(() => {
      setFilteredProducts(
        data.filter((item: Product) =>
          String(item.id).includes(value)
        )
      );
    }, 500);
    setDebounceTimer(timer);
  }

  return (
    <main className="ProductsMain">
      <input
        type="text"
        className="Input"
        placeholder="Filtrar pelo código do produto"
        value={filter}
        onChange={handleInputChange}
      />
      <ProductList products={filteredProducts} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}

export default ProductsPage;
