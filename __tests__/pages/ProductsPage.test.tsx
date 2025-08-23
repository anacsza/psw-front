import { render, screen } from '@testing-library/react';
import ProductsPage from 'src/pages/products/ProductsPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => [
    { id: 1, name: 'Smartphone Samsung Galaxy S24 FE', price: 2498, category: 'Celulares e Smartphones' }
  ],
  useNavigate: () => jest.fn(),
}));

test('when one product on the list should return Smartphone Samsung Galaxy S24 FE', () => {
  render(<ProductsPage />);
  expect(screen.getByText(/Smartphone Samsung Galaxy S24 FE/i)).toBeInTheDocument();
});

test('when the list is empty should return nenhum produto encontrato', () => {
  const router = require('react-router-dom');
  jest.spyOn(router, 'useLoaderData').mockReturnValue([]);
  render(<ProductsPage />);
  expect(screen.getByText(/Nenhum produto encontrado/i)).toBeInTheDocument();
});

test('when three products on the list should return Smartphone Samsung Galaxy S24 FE, Smartphone Samsung Galaxy A56 and Smartphone Samsung Galaxy A25', () => {
  const router = require('react-router-dom');
  jest.spyOn(router, 'useLoaderData').mockReturnValue([
    { id: 1, name: 'Smartphone Samsung Galaxy S24 FE', price: 2498, category: 'Celulares e Smartphones' },
    { id: 2, name: 'Smartphone Samsung Galaxy A56', price: 1834, category: 'Celulares e Smartphones' },
    { id: 3, name: 'Smartphone Samsung Galaxy A25', price: 1349.1, category: 'Celulares e Smartphones' }
  ],);
  render(<ProductsPage />);
  expect(screen.getByText(/Smartphone Samsung Galaxy S24 FE/i)).toBeInTheDocument();
  expect(screen.getByText(/Smartphone Samsung Galaxy A56/i)).toBeInTheDocument();
  expect(screen.getByText(/Smartphone Samsung Galaxy A25/i)).toBeInTheDocument();
});