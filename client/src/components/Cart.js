import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import Auth from "../utils/auth";
import { useStoreContext } from "../utils/GlobalState";
import CartItem from "./CartItem";
import { ADD_MULTIPLE_TO_CART } from "../utils/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadCry } from "@fortawesome/free-solid-svg-icons";

const stripePromise = loadStripe(
  "pk_test_51NDWu1BPxAL3HDjs8eVWcvlYJm4e3omilaCAVES0fg0K9MFSeU4ziyYTdGFV3fdmgZllfo15nw7rWBpuFjK3VOyN00lbCzA9Ka"
);

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, uploads: [...cart] });
    }
    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);
  //most likely do not need to multiply by upload.purchaseQuantity
  function calculateTotal() {
    let sum = 0;
    console.log(state.cart)
    state.cart.forEach((upload) => {
      console.log(upload)
      sum += upload.price * upload.purchaseQuantity;
    });
    return sum.toFixed(2);
  }
  function submitCheckout() {
    const uploadIds = [];

    state.cart.forEach((upload) => {
      for (let i = 0; i < upload.purchaseQuantity; i++) {
        uploadIds.push(upload);
      }
    });
    getCheckout({
      variables: { uploads: uploadIds },
    });
  }
  return (
    <div className="cart">
      <h2>Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((upload) => (
            <CartItem key={upload._id} upload={upload} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(Log In to Check Out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          Your cart is empty! <FontAwesomeIcon icon={faFaceSadCry} />
        </h3>
      )}
    </div>
  );
};
 export default Cart;