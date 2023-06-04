import React from "react";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const CartItem = ({ upload }) => {
  const [, dispatch] = useStoreContext();
  const removeFromCart = (upload) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: upload._id,
    });
    idbPromise("cart", "delete", { ...upload });
  };
  //do not think this is neccesary
  // const onChange = (e) => {
  //   const value = e.target.value;
  //   if (value === "0") {
  //     dispatch({
  //       type: REMOVE_FROM_CART,
  //       _id: upload._id,
  //     });
  //     idbPromise("cart", "delete", { ...upload });
  //   } else {
  //     dispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: upload._id,
  //       purchaseQuantity: parseInt(value),
  //     });
  //     idbPromise("cart", "put", {
  //       ...upload,
  //       purchaseQuantity: parseInt(value),
  //     });
  //   }
  // };
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">



      <div className='card ' style={{ width: '10rem', backgroundColor: 'rgb(253, 242, 234)' }}>
        <img src={`/images/${upload.img}`} alt={upload.description} style={{ width: '10rem' }} />

        <p className="upload-text">{upload.album}, ${upload.price}</p>


        {/* <span>Qty:</span>
          <input
            type="number"
            placeholder="0"
            value={upload.purchaseQuantity}
            onChange={onChange}
          /> */}
        <button onClick={() => removeFromCart(upload)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>

      </div>
    </div>
  );
};

export default CartItem;