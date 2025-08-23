import CsvUpload from '../../components/products/CsvUpload';

const ImportCsvPage = () => {
  return (
    <main className="ImportCsvMain">
      <CsvUpload onProductsLoaded={() => {}} />
    </main>
  );
};

export default ImportCsvPage;
