import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // for ES6 modules

import CartItem from "../../Components/CartItem";
import { CURRENCY } from "../../constant";
import { validateCoupon, checkout } from "../../api";
import { apply_coupon, confirm_Checkout } from "../../Store/actions/cart";
import "./style.css";

const Cart = () => {
  const state = useSelector((state) => state.cartReducer.cartArray);
  const user = useSelector((state) => state.authReducer.user);
  const coupon_data = useSelector((state) => state.cartReducer.coupon);
  const [subtotal, setSubtotal] = useState(0);
  const [promoCode, setpromoCode] = useState("");
  const [shippingCharge, setShippingCharges] = useState(30);
  const [toggle, setToggle] = useState(false);
  const [couponData, setCouponData] = useState("");
  const [couponPrice, setCouponPrice] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleToggleShipping = () => {
    setToggle(!toggle);
  };
  const confirmCheckout = async () => {
    if (!user) return history.push("/signIn", { from: "cartPage" });

    let productList = state.map((x) => {
      return { productId: x.id, quantity: x.quantity, priceId: x.priceId };
    });

    let body;
    if (couponData) {
      body = {
        userId: user?.id,
        coupon: true,
        couponId: couponData?.id,
        couponAmount: +couponPrice,
        totalAmount: +subtotal,
        netAmount: +subtotal - +couponPrice,
        productList: productList,
      };
    } else {
      body = {
        userId: user?.id,
        coupon: false,
        totalAmount: +subtotal,
        netAmount: +subtotal,
        productList: productList,
      };
    }

    try {
      const { data, statusCode } = await checkout(body);
      console.log(data);
      if (statusCode === 1) {
        dispatch(confirm_Checkout(data?.id));
        history.push("/shoppingDetail");
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setCouponData(coupon_data);
    let temp = 0;

    for (let index = 0; index < state.length; index++) {
      const element = state[index];
      let value = element.price * element.quantity;
      temp += value;
    }
    console.log(temp);

    setSubtotal(temp);
    setCouponPrice(coupon_data ? temp / coupon_data.percentageOff : 0);
  }, [state, coupon_data]);

  const coupon = async () => {
    if (!promoCode) return toast.warning("Enter Promo Code");
    try {
      const data = await validateCoupon(promoCode);
      console.log(data);
      if (data?.statusCode === 1) {
        dispatch(apply_coupon(data?.data));
        return toast.success("Coupon Verified");
      } else {
        return toast.warning(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
                  <p>{couponData ? "Coupon" : null}</p>
                </div>
                <div>
                  <p>
                    {CURRENCY}
                    {subtotal}
                  </p>
                  <p>
                    {toggle ? (
                      <>
                        {CURRENCY}
                        {shippingCharge}
                      </>
                    ) : (
                      "$0"
                    )}
                  </p>
                  <p>{couponData ? couponData.percentageOff + "%" : null}</p>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <p className="font-weight-bold">Order Total</p>
                <p className="font-weight-bold">
                  {CURRENCY}
                  {toggle
                    ? shippingCharge +
                      (couponPrice ? subtotal - couponPrice : subtotal)
                    : couponPrice
                    ? subtotal - couponPrice
                    : subtotal}
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
                  <button
                    className="btn btn-light btn-block text-truncate btn-sm mt-2"
                    onClick={coupon}
                  >
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
