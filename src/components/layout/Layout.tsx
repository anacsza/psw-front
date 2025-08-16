
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
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbInByb2R1Y3RzOnJlYWQiLCJwcm9kdWN0czpjcmVhdGUiLCJwcm9kdWN0czpkZWxldGUiLCJwcm9kdWN0czp1cGRhdGUiXSwiaWF0IjoxNzU1MzU5OTIxLCJleHAiOjE3NTUzNjA4MjF9.YND4BeZQP-L6KmntT3GIZr5W1ioF0J6mrY5m2YzNdpM'
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

export function addCache(newProducts: Product[]) {
  cachedResponse = newProducts;
}