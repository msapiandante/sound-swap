import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

function UploadItem(item) {
    const [state, dispatch] = useStoreContext();

    const {
        img,
        album,
        artist,
        price,
        _id
    } = item;

    const { cart } = state

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id)
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                upload: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className='card upload-card'>
                <Link to={`/products/${_id}`} style={{ textDecoration: 'none' }}>
                    <img
                        alt={album}
                        src={`/images/${img}`}
                        className='card-img-top'
                    />
                    <p className="card-title upload-text">{album}: {artist}</p>
                    <p className="upload-text">${price}</p>
                </Link>
                <button className="add-cart-button" onClick={addToCart}>Add to cart</button>
            </div>
        </div>
    );
};

export default UploadItem;