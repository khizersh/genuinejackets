import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./style.css";
import { getOrderDetail } from "../../api";
import { CURRENCY } from "../../constant";

const ThankYou = () => {
  const curreny_type_State = useSelector(
    (state) => state.currencyReducer.currency_Value
  );
  const [products, setProducts] = useState([]);
  const [subtotal, setSubTotal] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const getDetail = async () => {
      try {
        const { data, statusCode } = await getOrderDetail(id);
        if (statusCode === 1) {
          setProducts(data?.productList);
          let temp = 0;
          for (let index = 0; index < data?.productList?.length; index++) {
            const element = data?.productList[index];
            let value = element.price * element.quantity;
            temp += value;
          }

          setSubTotal(temp);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();
  }, []);
  return (
    <div className="mt-5  thankyou_Wrapper mx-5">
      <h1 className="display-3 my-3 font-weight-bold thankyou_heading">
        Thank you .
      </h1>
      <div className="row justify-content-center ">
        <div className="col-md-8 mr-5 left_row_thankyou my-3 border_bottom p-0">
          <p className="bg_color_dark text-white px-4 py-2 text-uppercase ml-0 ">
            Your Order #{id} has been Created.
          </p>
          <div className="h4 content_thankyou py-3 text-muted w-75">
            <p>
              Check Your email Shortly for confirmation of your order. Please
              keep it for your records.
            </p>
            <p className="mt-5">
              Now it's time to crank that stereo and start bragging!
            </p>
          </div>
        </div>
        <div className="col-md-3  border_bottom w-100  p-0 right_row_thankyou my-3">
          <p className="bg_color_dark text-white px-4 py-2 text-uppercase ">
            You Purchased :
          </p>
          <div className="border border-gray  py-4 px-3">
            <div className="py-2 ">
              <div className="d-flex justify-content-between align-items-center font-weight-bold">
                <p>PRODUCT</p>
                <p>TOTAL</p>
              </div>
              <hr />
              {products?.length
                ? products.map((pro, ind) => (
                    <div
                      className="d-flex justify-content-between align-items-center"
                      key={ind}
                    >
                      <div className="d-flex">
                        <p>{pro?.productTitle}</p>
                        <p className="mx-1 text-muted"> x {pro?.quantity}</p>
                      </div>
                      <p>
                        {curreny_type_State === "EUR" ? "???" : CURRENCY} {pro?.price}
                      </p>
                    </div>
                  ))
                : null}
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <p className="font-weight-bold">Subtotal </p>
                </div>
                <p>
                  {curreny_type_State === "EUR" ? "???" : CURRENCY} {subtotal}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
