import './index.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, loader as layoutLoader } from './components/layout/Layout';
import ProductsPage from './pages/products/ProductsPage';
import NewProductPage from './pages/products/NewProductPage';
import EditProductPage from './pages/products/EditProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'produtos', element: <ProductsPage />, loader: layoutLoader },
      { path: 'produtos/novo', element: <NewProductPage />, loader: layoutLoader },
      { path: 'produtos/:id', element: <EditProductPage />, loader: layoutLoader }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router} />
);