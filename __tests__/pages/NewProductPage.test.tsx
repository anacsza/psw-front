import { render, screen, fireEvent } from '@testing-library/react';
import NewProductPage from '../../src/pages/products/NewProductPage';
import { expect, jest } from '@jest/globals';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: () => [],
    useNavigate: () => jest.fn(),
}));

jest.mock('../../src/components/layout/Layout', () => ({
    saveProduct: jest.fn(async (product) => ({ ...product, id: 123 })),
}));

describe('NewProductPage', () => {
    test('when open new product page should show the fields', async () => {
        render(<NewProductPage />);
        fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Novo Produto' } });
        fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Descrição do produto' } });
        fireEvent.change(screen.getByLabelText(/preço/i), { target: { value: '99.99' } });
        fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: 'Categoria' } });
        fireEvent.change(screen.getByLabelText(/url da imagem/i), { target: { value: 'http://imagem.com/img.png' } });
        fireEvent.click(screen.getByText(/criar/i));
        expect(await screen.findByDisplayValue(/Novo Produto/i)).toBeInTheDocument();
        expect(await screen.findByDisplayValue(/Descrição do produto/i)).toBeInTheDocument
        expect(await screen.findByDisplayValue(/99.99/i)).toBeInTheDocument();
        expect(await screen.findByDisplayValue(/Categoria/i)).toBeInTheDocument();
        expect(await screen.findByDisplayValue(/http:\/\/imagem\.com\/img\.png/i)).toBeInTheDocument(); 
    });
});
