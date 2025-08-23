import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Product } from '../../types/products/Product';
import { NewProduct } from '../../components/products/NewProduct';
import { saveProduct } from '../../components/layout/Layout';


function NewProductPage() {
  const navigate = useNavigate();
  const data = useLoaderData<Product[]>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(data);
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: '',
    pictureUrl: ''
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    product.id = null;
    const newProduct = await saveProduct(product);
    if (newProduct) {
      setFilteredProducts([...filteredProducts, newProduct]);
    }
    navigate('/produtos');
  }

  function handleCancel() {
    navigate('/produtos');
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="ProductForm">
        <NewProduct product={product} onSubmit={handleSubmit} onChange={handleChange} />
        <button type="button" onClick={handleCancel} className="Button">Cancelar</button>
      </form>
    </main>
  );
}

export default NewProductPage;