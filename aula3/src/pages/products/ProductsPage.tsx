import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ProductList } from '../../components/products/ProductList';
import { Product } from '../../types/products/Product';

function ProductsPage() {
  const data = useLoaderData<Product[]>();
  const [filter, setFilterProducts] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(data);

  console.log(data);

  function handleEdit() {
    alert('Alterado');
  }

  function handleDelete() {
    alert('Excluído');
  }

  function handleFilter() {
    setFilteredProducts(
      data.filter((item: Product) =>
        String(item.id).includes(filter)
      )
    );
  }

  return (
    <main>
      <input type="text" className="Input" placeholder="Filtrar pelo código do produto" value={filter} onChange={e => setFilterProducts(e.target.value)} />
      <button className="Button" onClick={handleFilter}>Filtrar</button>
      <ProductList products={filteredProducts} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}

export default ProductsPage;
