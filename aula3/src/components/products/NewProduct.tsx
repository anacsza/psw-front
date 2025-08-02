import './NewProduct.css';
import { Product } from '../../types/products/Product';

interface NewProductProps {
    product: Product;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function NewProduct({ product, onSubmit, onChange }: NewProductProps) {
    return (
        <>
            <label>
                Nome:
                <input name="name" value={product.name} onChange={onChange} />
            </label>
            <label>
                Descrição:
                <textarea name="description" value={product.description} onChange={onChange} />
            </label>
            <label>
                Preço:
                <input name="price" type="number" value={product.price} onChange={onChange} />
            </label>
            <label>
                Categoria:
                <input name="category" value={product.category} onChange={onChange} />
            </label>
            <label>
                URL da Imagem:
                <input name="pictureUrl" value={product.pictureUrl} onChange={onChange} />
            </label>
            <button onClick={onSubmit} type="submit" className="Button">Criar</button>
        </>
    );
}
