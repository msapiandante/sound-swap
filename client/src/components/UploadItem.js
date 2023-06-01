import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

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
                product: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }

    return (
        <div>
            <Link to={`/products/${_id}`}>
                <img
                    alt={album}
                    src={`/images/${img}`}
                />
                <p>{album}: {artist}</p>
                <p>${price}</p>
            </Link>
            <button onClick={addToCart}>Add to cart</button>
        </div>
    );
};

export default UploadItem;