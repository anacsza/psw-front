import { render, screen, fireEvent } from '@testing-library/react';
import EditProductPage from '../../src/pages/products/EditProductPage';
import { jest } from '@jest/globals';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => [
    { id: 1, name: 'Smartphone Samsung Galaxy S24 FE', price: 2498, category: 'Celulares e Smartphones', description: 'desc', pictureUrl: '' }
  ],
  useNavigate: () => jest.fn(),
  useParams: () => ({ id: '1' }),
}));

jest.mock('../../src/components/layout/Layout', () => ({
  editProduct: jest.fn(async (id, product) => ({ ...product, id })),
}));

describe('EditProductPage', () => {
  test('renders form and edits product', async () => {
    render(<EditProductPage />);
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Produto Editado' } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Nova descrição' } });
    fireEvent.change(screen.getByLabelText(/preço/i), { target: { value: '199.99' } });
    fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: 'Nova Categoria' } });
    fireEvent.change(screen.getByLabelText(/url da imagem/i), { target: { value: 'http://imagem.com/img2.png' } });
  });
});
