import { useEffect } from "react";
import { Table } from "reactstrap";
import { AiOutlineLeft } from "react-icons/ai";
import { useSelector } from "react-redux";

import { CURRENCY } from "../../constant";

const Orders = ({ showOrderDetails, order }) => {
  const curreny_type_State = useSelector(
    (state) => state.currencyReducer.currency_Value
  );
  useEffect(() => {}, [order]);
  return (
    <div className="h-100 ">
      <AiOutlineLeft
        size={26}
        className="my-2"
        onClick={() => showOrderDetails(false)}
      />
      <div className="d-flex justify-content-between p-1">
        <p>
          <b>Id:</b> {order?.id}
        </p>
        <p>
          <b>Date: </b>
          {new Date(order?.orderDate).toLocaleDateString()}
        </p>
      </div>
      <div className="d-flex justify-content-between">
        <p>
          <b>Total: </b>
          {order?.totalAmount}
        </p>
        <p>{order?.coupon ? `<b>Coupon</b> ${order?.couponTitle}` : null}</p>
      </div>
      <div
        style={{
          maxHeight: "250px",
          overflowY: "auto",
        }}
      >
        <Table responsive>
          <thead style={{ backgroundColor: "#e4e4e4" }}>
            <tr className="text-center">
              <th className="tableHeading">Product Name</th>
              <th className="tableHeading">Product Image</th>
              <th className="tableHeading">Quantity</th>
              <th className="tableHeading">SubTotal</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {order?.productList?.length
              ? order?.productList?.map((ord, ind) => (
                  <tr key={ind}>
                    <td>{ord?.productTitle}</td>
                    <td>
                      <img
                        src={ord?.productImage}
                        alt={ord?.productTitle}
                        style={{ height: "50px" }}
                      />
                    </td>
                    <td>{ord?.quantity}</td>
                    <td>
                      {curreny_type_State === "EUR" ? "€" : CURRENCY}
                      {ord?.price}
                    </td>
                  </tr>
                ))
              : null}
            {/* <tr>
              <td>Red Jacket</td>
              <td>
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                  alt=""
                  style={{ height: "50px" }}
                />
              </td>
              <td>25</td>
              <td>2000</td>
            </tr>
            <tr>
              <td>Red Jacket</td>
              <td>
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                  alt=""
                  style={{ height: "50px" }}
                />
              </td>
              <td>25</td>
              <td>2000</td>
            </tr>
            <tr>
              <td>Red Jacket</td>
              <td>
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                  alt=""
                  style={{ height: "50px" }}
                />
              </td>
              <td>25</td>
              <td>2000</td>
            </tr>
            <tr>
              <td>Red Jacket</td>
              <td>
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                  alt=""
                  style={{ height: "50px" }}
                />
              </td>
              <td>25</td>
              <td>2000</td>
            </tr>
            <tr>
              <td>Red Jacket</td>
              <td>
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                  alt=""
                  style={{ height: "50px" }}
                />
              </td>
              <td>25</td>
              <td>2000</td>
            </tr> */}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Orders;
