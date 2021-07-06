import React from "react";
import "./style.css";
const index = () => {
  return (
    <div className="mt-5  thankyou_Wrapper mx-5">
      <h1 className="display-3 my-3 font-weight-bold thankyou_heading">Thank you .</h1>
      <div className="row justify-content-center ">
        <div className="col-md-8 mr-5 left_row_thankyou my-3 border_bottom p-0">
          <p className="bg_color_dark text-white px-4 py-2 text-uppercase ml-0 ">
            Your Order #5656565 has been Created.
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
          <div className="center">
            <p className="h1 font-weight-bold">1</p>
            <span className="text-muted h2">x</span>
            <img
              src="https://www.alfatah.com.pk/wp-content/uploads/2020/08/DW-133G.jpg"
              alt="oven"
              className="w-75"
              style={{height:'300px'}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
