import { Digital } from "react-activity";
import PhoneInput from "react-phone-input-2";
import ReactFlagsSelect from "react-flags-select";

import "react-phone-input-2/lib/style.css";
import {  useState } from "react";
import "./style.css";
const Index = () => {
  const [phone, setPhone] = useState();

  const [selected, setSelected] = useState("PK");
  return (
    <div className="container mt-5">
      {/* <Digital p-1 color="#727981" size={40} animating={true} /> */}
      <div className="row pt-5">
        <div className=" col-lg-8">
          <form>
            <div className="row">
              <div className="p-1 col-md-6">
                <div className="form-group">
                  <label for="exampleFormControlInput1">Name</label>
                  <input
                    type="text"
                    className="form-control space"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="p-1 col-md-6 w-100 spaceB">
                <PhoneInput
                  inputStyle={{ padding: "22px 50px" }}
                  country={"pk"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                />
              </div>
              <div className="p-1 col-md-6">
                <div className="form-group">
                  <label for="exampleFormControlInput1">Address</label>
                  <input
                    type="text"
                    className="form-control space"
                    placeholder="Street,house/apartment/unit"
                  />
                </div>
              </div>
              <div className="p-1 col-md-6 w-100 spaceB">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control space"
                    placeholder="Apt, Suit, Unit, etc.(Optional)"
                  />
                </div>
              </div>
              <div className="p-1 col-md-3">
                <ReactFlagsSelect
                  className="p-0"
                  selected={selected}
                  onSelect={(code) => setSelected(code)}
                />
              </div>
              <div className="p-1 col-md-3">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control space"
                    placeholder="State/Province/Region"
                  />
                </div>
              </div>
              <div className="p-1 col-md-3">
                {" "}
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control space"
                    placeholder="City"
                  />
                </div>
              </div>
              <div className="p-1 col-md-3">
                {" "}
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control space"
                    placeholder="Zip Code"
                  />
                </div>
              </div>
            </div>
          </form>
          <button className="btn btn-danger px-4 mt-5">
            Save and continue
          </button>
        </div>
        <div className=" col-lg-4 rightSide_shipping">
          <h3 className="font-weight-bold">Your Order</h3>

          <div className="border border-gray  py-4 px-3">
            <div className="py-2 ">
              <div className="d-flex justify-content-between align-items-center font-weight-bold">
                <p>PRODUCT</p>
                <p>TOTAL</p>
              </div>
              <hr />
              {/* Items */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <p>Order Item </p>
                  <p className="mx-1 text-muted"> x 5</p>
                </div>
                <p>Rs 0</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <p>Order Item </p>
                  <p className="mx-1 text-muted"> x 5</p>
                </div>
                <p>Rs 0</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <p className="font-weight-bold">Subtotal </p>
                </div>
                <p>Rs 100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
