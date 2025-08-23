import { render, screen } from '@testing-library/react';
import ProductsPage from 'src/pages/products/ProductsPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => [
    { id: 1, name: 'Smartphone Samsung Galaxy S24 FE', price: 2498, category: 'Celulares e Smartphones' }
  ],
  useNavigate: () => jest.fn(),
}));

test('renders product name', () => {
  render(<ProductsPage />);
  expect(screen.getByText(/Smartphone Samsung Galaxy S24 FE/i)).toBeInTheDocument();
});

