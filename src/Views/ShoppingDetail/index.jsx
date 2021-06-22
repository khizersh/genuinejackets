import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import ReactFlagsSelect from "react-flags-select";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "react-phone-input-2/lib/style.css";

import "./style.css";
import Stripe from "../../Components/Stripe";
import { stripeOrder } from "../../api";
import { useHistory } from "react-router-dom";

const Index = () => {
  const user = useSelector((state) => state.authReducer.user);
  const checkoutId = useSelector((state) => state.cartReducer.checkoutId);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [country, setCountry] = useState("PK");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selected, setSelected] = useState("PK");
  const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
  const history = useHistory();

  useEffect(() => {
    if (!user) return history.push("/signIn", { from: "cartPage" });
  }, []);

  const onSubmit = async (token) => {
    
    if (!name) return toast.warning("Enter Name");
    if (!phone) return toast.warning("Enter Number");
    if (!address1) return toast.warning("Enter Address");
    if (!country) return toast.warning("Select Country");
    if (!state) return toast.warning("Enter State");
    if (!city) return toast.warning("Enter City");
    if (paymentMethod !== "stripe")
      return toast.warning("Select Payment Method");

    try {
      let body = {
        userId: user?.id,
        email: user?.email,
        fullName: name,
        checkoutId: checkoutId,
        country,
        state,
        city,
        addressLine1: address1,
        addressLine2: address2,
        postalCode: zip,
        phoneNo: phone,
        token: token,
        suggestin: "xyz"
      }
      const { data, statusCode } = await stripeOrder(body);
      console.log(data, statusCode);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5">
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-1 col-md-6 w-100">
                <label>Phone Number</label>
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
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-1 col-md-6 w-100 spaceB">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control space"
                    placeholder="Apt, Suit, Unit, etc.(Optional)"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-1 col-md-3">
                <label>Country</label>
                <ReactFlagsSelect
                  className="p-0"
                  selected={selected}
                  onSelect={(code) => {
                    setSelected(code);
                    setCountry(code);
                  }}
                />
              </div>
              <div className="p-1 col-md-3">
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    className="form-control space"
                    placeholder="State/Province/Region"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-1 col-md-3">
                {" "}
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control space"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-1 col-md-3">
                {" "}
                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    className="form-control space"
                    placeholder="Zip Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className={`col-md-6 text-center border-1 p-2 mw-49 m-1 payment-heading font-weight-bold ${
                  paymentMethod === "stripe" && "active"
                }`}
                onClick={() => setPaymentMethod("stripe")}
              >
                Stripe
              </div>
              <div
                className={`col-md-6 text-center border-1 p-2 mw-49 m-1 payment-heading font-weight-bold ${
                  paymentMethod === "paypal" && "active"
                }`}
                onClick={() => setPaymentMethod("paypal")}
              >
                PayPal
              </div>
            </div>
          </form>
          {paymentMethod === "stripe" ? (
            <Elements stripe={stripePromise}>
              <Stripe onSubmit={onSubmit} />
            </Elements>
          ) : null}
          {/* <button className="btn btn-success px-4 mt-5">Confirm</button> */}
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
