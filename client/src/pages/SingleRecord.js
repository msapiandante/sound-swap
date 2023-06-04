import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useStoreContext } from '../utils/GlobalState';
import {
    UPDATE_UPLOADS,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART
} from '../utils/actions';
import { QUERY_UPLOADS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

function SingleRecord() {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();

    const [currentUpload, setCurrentUpload] = useState({});

    const { loading, data } = useQuery(QUERY_UPLOADS);

    const { uploads, cart } = state;

    useEffect(() => {
        if (uploads.length) {
            setCurrentUpload(uploads.find((upload) => upload._id === id));
        } else if (data) {
            dispatch({
                type: UPDATE_UPLOADS,
                uploads: data.uploads,
            });

            data.uploads.forEach((upload) => {
                idbPromise('uploads', 'put', upload);
            });
        } else if (!loading) {
            idbPromise('uploads', 'get').then((indexedUploads) => {
                dispatch({
                    type: UPDATE_UPLOADS,
                    products: indexedUploads,
                });
            });
        }
    }, [uploads, data, loading, dispatch, id]);

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                upload: { ...currentUpload, purchaseQuantity: 1 },
            });
            idbPromise('cart', 'put', { ...currentUpload, purchaseQuantity: 1 });
        }
    };

    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: currentUpload._id,
        });

        idbPromise('cart', 'delete', { ...currentUpload });
    };

    console.log(currentUpload)

    return (
        <>
            {currentUpload && cart ? (
                <div className="container my-1 single-rec-container">
                    <Link to="/" style={{color: "rgb(242, 70, 7)", textDecoration: "none", marginRight: "2rem"}}>← Back to All Records</Link>
                    <div className='col-container'>
                        <h2>{currentUpload.album}</h2>

                        <h3>{currentUpload.artist}</h3>

                        <p>{currentUpload.description}</p>

                        <p>
                            <strong>Price:</strong>${currentUpload.price}{' '}
                            <button className='single-button' onClick={addToCart}>Add to Cart</button>
                            <button className='single-button'
                                disabled={!cart.find((p) => p._id === currentUpload._id)}
                                onClick={removeFromCart}
                            >
                                Remove from Cart
                            </button>
                        </p>
                    </div>

                    <img
                        src={`/images/${currentUpload.img}`}
                        alt={currentUpload.album}
                        style={{ width: "25rem" }}
                    />
                </div>
            ) : null}
            {loading ? <p>Loading</p> : null}

        </>
    );
}

export default SingleRecord;

