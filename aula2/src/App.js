import './App.css';
import React from 'react';
import { DataContext } from './DataContext';

function App() {

  const data = React.useContext(DataContext);
  const [filteredProducts, setFilteredProducts] = React.useState(data);
  const [filter, setFilterProducts] = React.useState('');

  React.useEffect(() => {
    setFilteredProducts(data);
  }, [data]);

  console.log(data);

  const handleEdit = () => {
    alert('Alterado');
  };

  const handleDelete = () => {
    alert('Excluído');
  };

  const handleFilter = () => {
    setFilteredProducts(
      data.filter(item =>
        String(item.id).includes(filter)
      )
    );
  };

  return (
    <main>
      <input type="text" className="Input" placeholder="Filtrar pelo código do produto" value={filter} onChange={product => setFilterProducts(product.target.value)}></input>
      <button className="Button" onClick={handleFilter}>Filtrar</button>
      {filteredProducts.map(item => (
        <div key={item.id} className="Main-container">
          <figure className="Image-container">
            <img className="Image-container-img" src={item.pictureUrl} alt={item.name}></img>
          </figure>
          <section className="Info-container">
            <h1 className="Info-title">({item.id}) {item.name}</h1>
            <p className="Info-description">{item.category}</p>
            <p className="Info-price">{item.price}</p>
            <nav className="Button-container">
              <button className="Button" onClick={handleEdit}>Editar</button>
              <button className="Button" onClick={handleDelete}>Excluir</button>
            </nav>
          </section>
        </div>
      ))}
    </main>
  );
}

export default App;