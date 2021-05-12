import React from "react";
import "./style.css";
import CartItem from "../../Components/CartItem";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { TiStarburst } from "react-icons/ti";
import CartFooter from "../../Components/CartFooter";
import { useSelector } from "react-redux";

const Cart = () => {
  const state = useSelector((state) => state.cartReducer.cartArray);
  console.log("state: ",state);
  if (!state.length)
    return (
      <h1 className="d-flex justify-content-center align-items-center my-5">
        No Item Added
      </h1>
    );
  return (
    <div className="cart-wrapper mt-5 pt-5">
      <div className="container pt-3  item-main-wrapper">
        <div className="row">
          <div className="col-lg-7 my-3 bg-white p-3 cartItem-wrapper mr-2">
            <div className="d-flex justify-content-between">
              <p className="font-weight-bold mt-1">Bag</p>
              <p>{state.length} items</p>
            </div>
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
                  <p>Estimated Shipping:</p>
                </div>
                <div>
                  <p>$259.90</p>
                  <p>$259.90</p>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <p className="font-weight-bold">Order Total</p>
                <p className="font-weight-bold">$259.90</p>
              </div>
              <p className="secure-button btn btn-primary btn-block ">
                Secure Checkout
              </p>
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
      <div className="mt-3 container-fluid features-wrapper justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-3 col-sm-6 col-6 feature-item">
              <TiStarburst color={"white"} />
              <p>All sizes same price</p>
            </div>
            <div className="col-lg-3 col-sm-6 col-6 feature-item">
              <TiStarburst color={"white"} />
              <p>Return With 60 Days</p>
            </div>
            <div className="col-lg-3 col-sm-6 col-6 feature-item">
              <TiStarburst color={"white"} />
              <p>SSl Data Security</p>
            </div>
            <div className="col-lg-3 col-sm-6 col-6 feature-item">
              <TiStarburst color={"white"} />
              <p>Flat express Shipping Rate</p>
            </div>
          </div>
        </div>
      </div>
      <CartFooter />
    </div>
  );
};

export default Cart;
