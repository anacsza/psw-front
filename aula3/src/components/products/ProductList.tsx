import './ProductList.css';
import { Product } from '../../types/products/Product';

export function ProductList({ products, onEdit, onDelete }: {
    products: Product[];
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <>
            {products.map(item => (
                <div key={item.id} className="Main-container">
                    <figure className="Image-container">
                        <img className="Image-container-img" src={item.pictureUrl} alt={item.name} />
                    </figure>
                    <section className="Info-container">
                        <h1 className="Info-title">({item.id}) {item.name}</h1>
                        <p className="Info-description">{item.category}</p>
                        <p className="Info-price">R${item.price}</p>
                        <nav className="Button-container">
                            <button className="Button" onClick={onEdit}>Editar</button>
                            <button className="Button" onClick={onDelete}>Excluir</button>
                        </nav>
                    </section>
                </div>
            ))}
        </>
    );
}
