import React, { useMemo } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

import "./style.css";

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    []
  );

  return options;
};

const CardForm = ({onSubmit}) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    try {
      const payload = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
      });
      
      console.log("[PaymentMethod]", payload);
      if (payload?.error) {
        toast.error(payload?.error?.message);
      }
      else if(payload?.paymentMethod){
        onSubmit(payload?.paymentMethod?.id);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <label style={{ width: "100%" }}>
        Card details
        <CardElement
          className="stripeInput"
          options={options}
          onReady={() => {
            console.log("CardElement [ready]");
          }}
          onChange={event => {
            console.log("CardElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardElement [blur]");
          }}
          onFocus={() => {
            console.log("CardElement [focus]");
          }}
        />
      </label>
      <button className="btn btn-success px-4 mt-3" type="submit" disabled={!stripe}>
        Confirm
      </button>
    </form>
  );
};

export default CardForm;
