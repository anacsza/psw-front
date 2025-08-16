import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ProductList } from '../../components/products/ProductList';
import { Product } from '../../types/products/Product';
import axios from 'axios';

function ProductsPage() {
  const data = useLoaderData<Product[]>();
  const [filter, setFilterProducts] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(data);
  // Debounce timer
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  console.log(data);

  function handleEdit() {
    alert('Alterado');
  }

  async function handleDelete(productId: number) {
    const response = await axios.delete(`http://localhost:3000/produtos/${productId}`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbInByb2R1Y3RzOnJlYWQiLCJwcm9kdWN0czpjcmVhdGUiLCJwcm9kdWN0czpkZWxldGUiLCJwcm9kdWN0czp1cGRhdGUiXSwiaWF0IjoxNzU1MzU5OTIxLCJleHAiOjE3NTUzNjA4MjF9.YND4BeZQP-L6KmntT3GIZr5W1ioF0J6mrY5m2YzNdpM'
        }
    });
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
