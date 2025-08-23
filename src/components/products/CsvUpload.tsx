import React, { useState } from 'react';
import { saveProduct } from '../layout/Layout';
import Papa from 'papaparse';
import { Product } from '../../types/products/Product';

interface CsvProduct {
  name: string;
  price: number;
  [key: string]: any;
}

interface CsvUploadProps {
  onProductsLoaded: (products: CsvProduct[]) => void;
}

const CsvUpload: React.FC<CsvUploadProps> = ({ onProductsLoaded }) => {
  const [csvProducts, setCsvProducts] = useState<CsvProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [uploadResult, setUploadResult] = useState<{ success: CsvProduct[]; failed: CsvProduct[] }>({ success: [], failed: [] });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        setCsvProducts(results.data);
      },
    });
  };

  const handleSelectProduct = (index: number) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleLoadProducts = async () => {
    const success: CsvProduct[] = [];
    const failed: CsvProduct[] = [];
    for (let idx = 0; idx < csvProducts.length; idx++) {
      const prod = csvProducts[idx];
      if (selectedProducts.has(idx)) {
        if (prod.name && prod.price) {
          try {
            const product: Product = {
              id: prod.id,
              name: prod.name,
              price: prod.price,
              description: prod.description || '',
              category: prod.category || '',
              pictureUrl: prod.pictureUrl || '',
            };
            await saveProduct(product);
            success.push(product);
          } catch (e) {
            failed.push(prod);
          }
        } else {
          failed.push(prod);
        }
      }
    }
    setUploadResult({ success, failed });
    onProductsLoaded(success);
  };

  return (
    <section style={{ marginTop: 32 }}>
      <h2>Upload de Produtos via CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {csvProducts.length > 0 && (
        <div>
          <h3>Produtos extraídos do CSV</h3>
          <ul>
            {csvProducts.map((prod, idx) => (
              <li key={idx}>
                <input
                  type="checkbox"
                  checked={selectedProducts.has(idx)}
                  onChange={() => handleSelectProduct(idx)}
                />
                {prod.name} - R$ {prod.price}
              </li>
            ))}
          </ul>
          <button onClick={handleLoadProducts}>Carregar produtos selecionados</button>
        </div>
      )}
      {(uploadResult.success.length > 0 || uploadResult.failed.length > 0) && (
        <div>
          <h3>Resultado do carregamento</h3>
          <div>
            <strong>Sucesso:</strong>
            <ul>
              {uploadResult.success.map((prod, idx) => (
                <li key={idx}>{prod.name} - R$ {prod.price}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Falha:</strong>
            <ul>
              {uploadResult.failed.map((prod, idx) => (
                <li key={idx}>{prod.name || 'Sem nome'} - R$ {prod.price || 'Sem preço'}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default CsvUpload;
