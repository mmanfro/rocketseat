import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

function Main() {
    const [products, setProducts] = useState([]);
    const [productsInfo, setProductsInfo] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
       loadProducts();
    }, []);

    const loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productsInfo } = response.data;

        setProducts(docs);
        setProductsInfo(productsInfo);
        setPage(page);
        window.scrollTo(0, 0);
    };

    const prevPage = () => {
        if (page === 1) return;

        loadProducts(page - 1);
    };

    const nextPage = () => {
        if (page === productsInfo.pages) return;

        loadProducts(page + 1);
    };

    return (
        <div className="product-list">
            {
                products.map(product =>  (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))
            }
            <div className="actions">
                <button disabled={page === 1} onClick={prevPage}>Anterior</button>
                <button disabled={page === productsInfo.pages} onClick={nextPage}>Próxima</button>
            </div>
        </div>
    )
}

export default Main;