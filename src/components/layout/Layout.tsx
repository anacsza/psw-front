
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
        const response = await axios.get('http://localhost:3000/produtos', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbInByb2R1Y3RzOnJlYWQiLCJwcm9kdWN0czpjcmVhdGUiLCJwcm9kdWN0czpkZWxldGUiLCJwcm9kdWN0czp1cGRhdGUiXSwiaWF0IjoxNzU1MzY0MDM3LCJleHAiOjE3NTUzNjQ5Mzd9.QiYOMfNNVA8rrpv-Caou-cmW3BEjsO4z9Y-iGhg0zU0'
            }
        });
        if (response.status === 200) {
            cachedResponse = response.data;
        }
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function saveProduct(newProduct: Product) {
    console.log('Salvando produto:', newProduct);
    const response = await axios.post('http://localhost:3000/produtos',
        newProduct,
        {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbInByb2R1Y3RzOnJlYWQiLCJwcm9kdWN0czpjcmVhdGUiLCJwcm9kdWN0czpkZWxldGUiLCJwcm9kdWN0czp1cGRhdGUiXSwiaWF0IjoxNzU1MzY0MDM3LCJleHAiOjE3NTUzNjQ5Mzd9.QiYOMfNNVA8rrpv-Caou-cmW3BEjsO4z9Y-iGhg0zU0',
                'Content-Type': 'application/json'
            }
        }
    );
    if (response.status === 200 || response.status === 201) {
        cachedResponse.push(newProduct);
    }
}

export async function editProduct(id: any, editedProduct: Product) {
    console.log('Editando produto:', editedProduct, id);
    editedProduct.id = id as number;
    const response = await axios.put(`http://localhost:3000/produtos/${id}`,
        editedProduct,
        {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbInByb2R1Y3RzOnJlYWQiLCJwcm9kdWN0czpjcmVhdGUiLCJwcm9kdWN0czpkZWxldGUiLCJwcm9kdWN0czp1cGRhdGUiXSwiaWF0IjoxNzU1MzY0MDM3LCJleHAiOjE3NTUzNjQ5Mzd9.QiYOMfNNVA8rrpv-Caou-cmW3BEjsO4z9Y-iGhg0zU0',
                'Content-Type': 'application/json'
            }
        }
    );
    if (response.status === 200 || response.status === 201) {
        console.log('Produto editado com sucesso:', editedProduct);
        cachedResponse = cachedResponse.map(product =>
            product.id === editedProduct.id ? response.data : product
        );
    }
}