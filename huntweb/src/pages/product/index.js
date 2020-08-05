import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import './styles.css'

function Product(props) {
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetchData();

    }, [props]);

    const fetchData = async () => {
        const { id } = props.match.params;
        // Promise.all([

        // ])
        api.get(`/products/${id}`).then(product => {
            setProduct(product.data);
        });

        console.log(product);
    };

    return (
        <div className="product-info">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>
                URL: <a href={product.url}>{product.url}</a>
            </p>
        </div>
    )
};

export default Product;