import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ProductList } from '../../components/products/ProductList';
import { Product } from '../../types/products/Product';

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

  function handleDelete() {
    alert('Excluído');
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
