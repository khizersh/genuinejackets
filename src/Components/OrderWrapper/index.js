import React, { useState } from "react";
import Orders from "../Orders";
import OrderDetail from "../OrderDetail";
import { useEffect } from "react";
const OrderDetailWrapper = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const showDetail = () => {
    setShowOrderDetails(true);
  };
  useEffect(() => {}, [showOrderDetails]);
  return showOrderDetails ? (
      <OrderDetail  showOrderDetails={setShowOrderDetails}  />
      ) : (
      <Orders showDetail={showDetail} />
  );
};

export default OrderDetailWrapper;
