import './App.css';
import React from 'react';
import { DataContext } from './DataContext';

function App() {

  const data = React.useContext(DataContext);

  console.log(data);

  const handleEdit = () => {
    alert('Alterado');
  };

  const handleDelete = () => {
    alert('Excluído');
  };

  return (
    <main>
      {data.map(item => (
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