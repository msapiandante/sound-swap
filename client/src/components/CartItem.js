import React from 'react';
import {useStoreContext} from '../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import {idbPromise} from '../utils/helpers';


const CartItem = ({upload}) => {
    const [, dispatch] = useStoreContext();
    const removeFromCart = upload => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: upload._id
        });
        idbPromise('cart', 'delete', {...upload});
    };

    const onChange = (e) => {
        const value = e.taarget.value;
        if(value=== '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: upload._id
            });
            idbPromise('cart', 'delete', {...upload});

        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: upload._id,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart', 'put', {...upload, purchaseQuantity: parseInt(value) })
        }
    }
    return (
        <div className='flex-row'>
            <div>
                <img src= {`/images/${upload.img}`} alt={upload.description}/>
            </div>
            <div>
            <div>{upload.album}, {upload.price}</div>


            </div>


        </div>








    )
}