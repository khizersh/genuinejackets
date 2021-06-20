import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import { getUserOrders } from "../../api";
const Orders = ({ showDetail   }) => {
  const { id } = useSelector((state) => state.authReducer.user);
  const getOrders = async () => {
    try {
      const { data } = await getUserOrders(id);
      console.log(data);
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
        <tr>
          <th className="tableHeading">Order Id</th>
          <th className="tableHeading">Total Amount</th>
          <th className="tableHeading">Details</th>
        </tr>
      </thead>
      <tbody>
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
        </tr>
      </tbody>
    </Table>
  );
};
export default Orders;
