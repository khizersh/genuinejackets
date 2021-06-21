import { useState, useEffect } from "react";

import Orders from "../Orders";
import OrderDetail from "../OrderDetail";
import { getOrderDetail } from "../../api";

const OrderDetailWrapper = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [id, setId] = useState(4);
  const [order, setOrder] = useState([]);
  const showDetail = (id) => {
    setShowOrderDetails(true);
    setId(id);
  };
  useEffect(() => {
    const getData = () => {
      try {
        const { data, statusCode } = getOrderDetail(id);
        console.log(data);
        if (statusCode === 1) {
          setOrder(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    id && getData();
  }, [id]);
  return showOrderDetails ? (
    <OrderDetail showOrderDetails={setShowOrderDetails} order={order} />
  ) : (
    <Orders showDetail={showDetail} />
  );
};

export default OrderDetailWrapper;
