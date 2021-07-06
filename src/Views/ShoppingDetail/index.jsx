import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import ReactFlagsSelect from "react-flags-select";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "react-phone-input-2/lib/style.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import "./style.css";
import Stripe from "../../Components/Stripe";
import { stripeOrder } from "../../api";
import { useHistory } from "react-router-dom";
import { empty_cart } from "../../Store/actions/cart";
import { CURRENCY } from "../../constant";

const Index = () => {
  const products = useSelector((state) => state.cartReducer.cartArray);
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
  const [subtotal, setSubtotal] = useState(0);
  const stripePromise = loadStripe(
    "pk_test_51IeOOQGrSShEYYrvGriEVk8ZC6BVsJFOFhnywdAjKJ1H2Z27hVnbkPAYvBw7H72Yu1tFPkwoTucIih3Nj144p8BO009vg4LiMm"
  );
  // const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return history.push("/signIn", { from: "cartPage" });
    let temp = 0;
    for (let index = 0; index < products?.length; index++) {
      const element = products[index];
      let value = element.price * element.quantity;
      temp += value;
    }

    setSubtotal(temp);
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
        suggestin: "xyz",
      };
      const { data, statusCode } = await stripeOrder(body);
      console.log(data, statusCode);
      if (statusCode === 1) {
        dispatch(empty_cart());
        toast.success("Order Placed Successfully");
        setTimeout(() => {
          history.replace(`/thankyou/${data?.checkoutId}`);
        }, 1000);
      }
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
          <PayPalScriptProvider
            options={{
              "client-id":
                "AK4scZxQtmOXH2wrD7SuHhNK5NirAJK4pA.VimpNLroHZ16xWrgS-x0a",
            }}
          >
            <PayPalButtons style={{ layout: "horizontal" }} />
          </PayPalScriptProvider>
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
              {products?.length
                ? products.map((pro, ind) => (
                    <div
                      className="d-flex justify-content-between align-items-center"
                      key={ind}
                    >
                      <div className="d-flex">
                        <p>{pro?.itemName}</p>
                        <p className="mx-1 text-muted"> x {pro?.quantity}</p>
                      </div>
                      <p>
                        {CURRENCY} {pro?.price}
                      </p>
                    </div>
                  ))
                : null}
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <p className="font-weight-bold">Subtotal </p>
                </div>
                <p>{CURRENCY} {subtotal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
