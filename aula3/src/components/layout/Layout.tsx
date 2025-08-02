
import './Layout.css';
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
    const response = await fetch('/data.json')
        .then(response => response.json())
        .catch(() => []);
    console.log(response);
    cachedResponse = response;
    return response;
}

export function addCache(newProducts: Product[]) {
  cachedResponse = newProducts;
}