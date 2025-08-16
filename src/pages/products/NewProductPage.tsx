import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Product } from '../../types/products/Product';
import { NewProduct } from '../../components/products/NewProduct';
import { addCache } from '../../components/layout/Layout';


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
    addCache([...data, product]);
    alert('Produto criado!');
    navigate('/produtos');
  }

  function handleCancel() {
    navigate('/produtos');
  }

  return (
    <main>
      <h2>Novo Produto</h2>
      <form onSubmit={handleSubmit} className="ProductForm">
        <NewProduct product={product} onSubmit={handleSubmit} onChange={handleChange} />
        <button type="button" onClick={handleCancel} className="Button">Cancelar</button>
      </form>
    </main>
  );
}

export default NewProductPage;