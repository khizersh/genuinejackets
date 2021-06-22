import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { getUserOrders } from "../../api";

const Orders = ({ showDetail }) => {
  const { id } = useSelector((state) => state.authReducer.user);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const { data, statusCode } = await getUserOrders(id);
      if (statusCode === 1) {
        setOrders(data);
      }
      // console.log(data,statusCode);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Table responsive>
      <thead style={{ backgroundColor: "#e4e4e4" }}>
        <tr className="text-center">
          <th className="tableHeading">Order Id</th>
          <th className="tableHeading">Total Amount</th>
          <th className="tableHeading">Details</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {orders?.length
          ? orders.map((ord, ind) => (
            <tr key={ind}>
              <td>{ind + 1}</td>
              <td>{ord?.totalAmount}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => showDetail(ord?.checkoutId)}
                >
                  More Info
                </button>
              </td>
            </tr>
          ))
          : null}
        {/* <tr>
          <td>454564545646546546546565</td>
          <td>Total AMount</td>
          <td>
        <button className="btn btn-info" onClick={showDetail}>More Info</button>
          </td>
        </tr>
        <tr>
          <td>454564545646546546546565</td>
          <td>Total AMount</td>
          <td>
        <button className="btn btn-info" onClick={showDetail}>More Info</button>
          </td>
        </tr>
        <tr>
          <td>454564545646546546546565</td>
          <td>Total AMount</td>
          <td>
        <button className="btn btn-info" onClick={showDetail}>More Info</button>
          </td>
        </tr>
        <tr>
          <td>454564545646546546546565</td>
          <td>Total Amount</td>
          <td>
        <button className="btn btn-info" onClick={showDetail}>More Info</button>
          </td>
        </tr>
        <tr>
          <td>454564545646546546546565</td>
          <td>Total AMount</td>
          <td>
            <button className="btn btn-info" onClick={showDetail}>More Info</button>
          </td>
        </tr> */}
      </tbody>
    </Table>
  );
};
export default Orders;
