import './App.css';

function App() {
  // Event handlers for buttons
  const handleEdit = () => {
    alert('Alterado');
  };

  const handleDelete = () => {
    alert('Excluído');
  };

  return (
     <main className="Main-container">
        <figure className="Image-container">
            <img className="Image-container-img" src="/iphone.jpg" alt="Smartphone IPhone XPTO"></img>
        </figure>
        <section className="Info-container">
            <h1 className="Info-title">(1234) Smartphone IPhone XPTO</h1>
            <p className="Info-description">Eletrônicos</p>
            <p className="Info-price">R$3.000,00</p>
            <nav className="Button-container">
                <button className="Button" onClick={handleEdit}>Editar</button>
                <button className="Button" onClick={handleDelete}>Excluir</button>
            </nav>
        </section>
    </main>
  );
}

export default App;