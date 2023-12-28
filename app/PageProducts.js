'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Typesense from 'typesense';

const PageProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 100;

  useEffect(() => {
    const client = new Typesense.Client({
      nodes: [
        {
          host: '95.216.171.30',
          port: 8108,
          protocol: 'http'
        }
      ],
      apiKey: 'exceloid-test'
    });

    async function fetchProducts() {
      try {
        const response = await client.collections('Products').documents().search({
          q: '*',
          per_page: perPage,
          page: currentPage
        });
        setProducts((prevProducts) => [...prevProducts, ...response.hits]);
        // console.log('Products:', response.hits);
      } catch (err) {
        setError(err.message || 'Error fetching products');
      }
    }

    fetchProducts();
  }, [currentPage]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', paddingLeft: '8%' }}>
        {products.map((product, id) => (
          <Link
            href={`/product/${product.document.handle}`}
            key={id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '5px',
              width: '300px'
            }}
          >
            <img
              src={product.document.featuredImage.url}
              alt={product.document.title}
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'contain',
                marginBottom: '10px',
                borderRadius: '5px'
              }}
            />
            <h3 style={{ margin: '0' }}>{product.document.title}</h3>
          </Link>
        ))}
      </div>
      <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>Load More</button>
    </div>
  );
};

export default PageProducts;
