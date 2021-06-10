import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdKeyboardArrowLeft } from "react-icons/md";

import CartItem from "../../Components/CartItem";
import CartFooter from "../../Components/CartFooter";
import { CURRENCY, products } from "../../constant";
import "./style.css";
import { useHistory } from "react-router";
import Toggle from "react-toggle";
import { validateCoupon } from "../../api";
import "react-toggle/style.css"; // for ES6 modules

const Cart = () => {
  const state = useSelector((state) => state.cartReducer.cartArray);
  const user = useSelector((state) => state.authReducer.user);
  const [subtotal, setSubtotal] = useState(0);
  const [promoCode, setpromoCode] = useState("");
  const [shippingCharge, setShippingCharges] = useState(30);
  const [toggle, setToggle] = useState(false);
  const history = useHistory();

  const handleToggleShipping = () => {
    setToggle(!toggle);
  };
  const confirmCheckout = async () => {
    if (!user) return history.push("/signIn", { from: "cartPage" });

    let productList = state.map((x) => {
      return { productId: x.id, quantity: x.quantity, priceId: x.priceId };
    });
    const body = {
      userId: user.id,
      coupon: false,
      totalAmount: +subtotal,
      netAmount: +subtotal,
      productList: productList,
    };
    console.log("body***", user.id);
    try {
      validateCoupon(body);
      history.push("/shoppingDetail");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    let temp = 0;

    for (let index = 0; index < state.length; index++) {
      const element = state[index];
      let value = element.price * element.quantity;
      temp += value;
    }
    console.log(temp);
    setSubtotal(temp);
  }, [state]);
  if (!state.length)
    return (
      <h1 className="d-flex justify-content-center align-items-center my-5">
        No Item Added
      </h1>
    );

  return (
    <div className="cart-wrapper mt-4">
      <div className="container pt-3  item-main-wrapper">
        <div className="row">
          <div className="col-lg-7 my-3 bg-white p-3 cartItem-wrapper mr-2">
            <div className="d-flex justify-content-between">
              <p className="font-weight-bold mt-1">Bag</p>
              <p>{state.length} items</p>
            </div>
            <hr />
            {state.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
          <div className="col-lg-4  my-3 ">
            <div className="item-main-wrapper bg-white py-3 px-4">
              <h5 className="">Order Total</h5>
              <div className="d-flex justify-content-between mt-3">
                <div className="w-50">
                  <p>Subtotal:</p>
                  {<p>{toggle ? "Expidet shipping :" : "Free Shipping"}</p>}
                </div>
                <div>
                  <p>
                    {CURRENCY}
                    {subtotal}
                  </p>
                  {toggle && (
                    <p>
                      {CURRENCY}
                      {shippingCharge}
                    </p>
                  )}
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <p className="font-weight-bold">Order Total</p>
                <p className="font-weight-bold">
                  {CURRENCY}
                  {toggle?shippingCharge + subtotal:subtotal}
                </p>
              </div>
              <p
                className="secure-button btn btn-primary btn-block"
                onClick={confirmCheckout}
              >
                Secure Checkout
              </p>
              <div className="d-flex justify-content-center align-items-center">
                <span className="font-weight-bold">Expidet shipping</span>
                <Toggle
                  className="ml-3"
                  defaultChecked={toggle}
                  icons={false}
                  onChange={handleToggleShipping}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-6">
                <div className="mt-5 bg-white p-3 item-main-wrapper">
                  <p className="font-weight-bold mb-0 py-3">
                    Do You Have a Promo Code?
                  </p>

                  <input
                    placeholder="enter promo code"
                    className="promo-input"
                    value={promoCode}
                    onChange={(e) => setpromoCode(e.target.value)}
                  />
                  <button className="btn btn-light btn-block text-truncate btn-sm mt-2">
                    Apply
                  </button>
                </div>
              </div>
              <div className="col-lg-12 col-md-6">
                <div className="mt-5 bg-white p-3 item-main-wrapper">
                  <p className="font-weight-bold py-3">Contact Us</p>
                  <h5 className="font-weight-bold mt-2 mb-0">1-800-245-8552</h5>
                  <p className="text-muted">Mon - Sun. 9AM - 12 AM (ET)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="d-flex align-items-center">
            <MdKeyboardArrowLeft size={25} />
            <p className="continue-Button">Continue Shopping</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
