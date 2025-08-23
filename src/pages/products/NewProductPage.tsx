import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Product } from '../../types/products/Product';
import { NewProduct } from '../../components/products/NewProduct';
import { saveProduct } from '../../components/layout/Layout';


function NewProductPage() {
  const navigate = useNavigate();
  const data = useLoaderData<Product[]>();
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
    console.log(`Campo alterado: ${name}, Novo valor: ${value}`);
    setProduct(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    product.id = null;
    console.log('Produto a ser salvo:', product);
    saveProduct(product);
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