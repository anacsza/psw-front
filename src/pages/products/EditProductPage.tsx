import { useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../types/products/Product';
import { NewProduct } from '../../components/products/NewProduct';
import { editProduct, saveProduct } from '../../components/layout/Layout';


function EditProductPage() {
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
  const { id } = useParams<{ id: string }>();

  function handleChange(e: any) {
    const { name, value } = e.target;
    console.log(`Campo alterado: ${name}, Novo valor: ${value}`);
    setProduct(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    product.id = null;
    console.log('Produto a ser editado:', product);
    console.log('ID do produto a ser editado:', id);
    editProduct(id, product);
    alert('Produto alterado!');
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

export default EditProductPage;