import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin3Line } from "react-icons/ri";

import "./style.css";
import { remove_from_cart, update_cart } from "../../Store/actions/cart";
import { CURRENCY } from "../../constant";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const curreny_type_State = useSelector(
    (state) => state.currencyReducer.currency_Value
  );
  const dispatch = useDispatch();
  const removeCart = () => {
    dispatch(remove_from_cart(item.id));
  };
  const updateCart = (quantityValue) => {
    if (item.quantity + quantityValue <= 1) return false;
    dispatch(update_cart({ id: item.id, quantityValue }));
  };
  useEffect(() => {
    setQuantity(item?.quantity);
    console.log(item);
    const sizes = ["Small", "Medium", "Large"];
    item?.attribute?.some((i) => {
      if (sizes?.includes(i)) {
        setSize(i);
      } else {
        setColor(i);
      }
    });
  }, [item]);
  return (
    <div className="col-md-12 p-0 my-2">
      <div className="item-content-wrapper d-flex ">
        <div>
          <img src={item.itemImage} className="cart-image" alt="" />
        </div>
        <div className="pl-4 w-100">
          <p className="font-weight-bold">{item.itemName}</p>
          {item && item.attribute.length && size && (
            <div className="d-flex align-item-center">
              <p className="font-weight-bold">Size: </p>
              <p className="ml-2"> {size}</p>
            </div>
          )}
          {item && item.attribute.length && (
            <div className="d-flex align-items-center">
              <p className="font-weight-bold">Color: </p>
              <p className="ml-2">{color}</p>
            </div>
          )}

          <div className="d-flex justify-content-end no-space ">
            <p className="font-weight-bold float-right">
              {curreny_type_State === "EUR" ? "???" : CURRENCY}
              {item?.quantity * item.price}
            </p>
          </div>
          <div className="web-show-stuff">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="custom-box"
                  onClick={() => updateCart(item.quantity - 1)}
                >
                  -
                </div>
                <div className="custom-box">{item?.quantity}</div>
                <div
                  className="custom-box"
                  onClick={() => updateCart(item.quantity + 1)}
                >
                  +
                </div>
              </div>
              <button
                className="btn bg-danger text-white delete-btn"
                onClick={removeCart}
              >
                <RiDeleteBin3Line />
              </button>
            </div>
            {/* <p className="text-available">
              Available - Delivery in 2-7 business days
            </p> */}
          </div>
        </div>
      </div>
      <div className="mob-show-stuff d-none mt-3">
        <div className="d-flex align-items-center  select-wrapper w-100">
          <div
            className="custom-box"
            onClick={() => updateCart(item.quantity - 1)}
          >
            -
          </div>
          <div className="custom-box">{item?.quantity}</div>
          <div
            className="custom-box"
            onClick={() => updateCart(item.quantity + 1)}
          >
            +
          </div>
          <button
            className="btn bg-danger text-white delete-btn"
            onClick={removeCart}
          >
            <RiDeleteBin3Line />
          </button>
        </div>
        {/* <p className="text-available">
          Available - Delivery in 2-7 business days
        </p> */}
      </div>
      <hr />
    </div>
  );
};

export default CartItem;
