
import './Layout.css';
import { Link, Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div className="layout-container">
            <aside className="sidebar">
                <nav>
                    <ul>
                        <li><Link to="/produtos">Produtos</Link></li>
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
    const response = await fetch('/data.json')
        .then(response => response.json())
        .catch(() => []);
    console.log(response);
    return response;
}