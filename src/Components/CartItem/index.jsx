import React from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { remove_from_cart } from "../../Store/actions/cart";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const removeCart = () => {
    dispatch(remove_from_cart(item.id));
  };
  return (
    <div className="col-md-12 p-0 my-2">
      <div className="item-content-wrapper d-flex ">
        <div>
          <img src={item.itemImage} className="cart-image" alt="" />
        </div>
        <div className="pl-4 w-100">
          <p className="font-weight-bold">{item.itemName}</p>
          {/* <p className="no-space text-small">Color: {item.attribute.color}</p>
          <p className="no-space">Size: {item.attribute.size}</p> */}
          <div className="d-flex justify-content-end no-space ">
            <p className="font-weight-bold float-right">$ 1293.95</p>
          </div>
          <div className="web-show-stuff">
            <div className="d-flex align-items-center  select-wrapper">
              {/* <select name="cars" id="cars" className="custom-select">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select> */}
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="custom-box"
                  // onClick={() =>
                  //   setQuantity(quantity <= 1 ? quantity - 0 : quantity - 1)
                  // }
                >
                  -
                </div>
                <div className="custom-box">0</div>
                <div
                  className="custom-box"
                  // onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </div>
              </div>
              <button className="btn btn-light delete-btn" onClick={removeCart}>
                X Delete
              </button>
            </div>
            <p className="text-available">
              Available - Delivery in 2-7 business days
            </p>
          </div>
        </div>
      </div>
      <div className="mob-show-stuff d-none mt-3">
        <div className="d-flex align-items-center  select-wrapper w-100">
          <div
            className="custom-box"
            // onClick={() =>
            //   setQuantity(quantity <= 1 ? quantity - 0 : quantity - 1)
            // }
          >
            -
          </div>
          <div className="custom-box">0</div>
          <div
            className="custom-box"
            // onClick={() => setQuantity(quantity + 1)}
          >
            +
          </div>
          <button className="btn btn-light delete-btn ">X Delete</button>
        </div>
        <p className="text-available">
          Available - Delivery in 2-7 business days
        </p>
      </div>
      <hr />
    </div>
  );
};

export default CartItem;
