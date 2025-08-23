
import './Layout.css';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import { Product } from '../../types/products/Product';

let cachedResponse: Product[] = [];

export function Layout() {
    return (
        <div className="layout-container">
            <aside className="sidebar">
                <nav>
                    <ul>
                        <li><Link to="/produtos">Produtos</Link></li>
                        <li><Link to="/produtos/novo">Novo Produto</Link></li>
                        <li><Link to="/produtos/importar-csv">Importar CSV</Link></li>
                    </ul>
                </nav>
            </aside>
            <div className="main-content">
                <header className="header">
                    <h1>Smartphones</h1>
                </header>
                <section className="content">
                    <Outlet />
                </section>
            </div>
        </div>
    );
}

export async function loader() {
    if (cachedResponse.length > 0) {
        return cachedResponse;
    }
    try {
        cachedResponse = [];
        const response = await axios.get('http://localhost:3001/api/product');
        if (response.status === 200) {
            cachedResponse = response.data;
        }
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function saveProduct(newProduct: Product) : Promise<Product> {
    const response = await axios.post('http://localhost:3001/api/product',
        newProduct
    );
    if (response.status === 200 || response.status === 201) {
        cachedResponse.push(response.data);
        alert('Produto criado!');
        return response.data;
    }
    return null as unknown as Product;
}

export async function editProduct(id: any, editedProduct: Product) : Promise<Product> {
    editedProduct.id = id as number;
    const response = await axios.put(`http://localhost:3001/api/product/${id}`,
        editedProduct
    );
    if (response.status === 200 || response.status === 201) {
        cachedResponse.forEach(product => {
            if (product.id === editedProduct.id) {
                product = editedProduct;
            }
        });
        return response.data;
    }
    return null as unknown as Product;

}