import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { AiOutlineLeft } from "react-icons/ai";

import { getOrderDetail } from "../../api";

const Orders = ({ showOrderDetails, order }) => {
  return (
    <div className="h-100 ">
      <AiOutlineLeft
        size={26}
        className="my-2"
        onClick={() => showOrderDetails(false)}
      />
      <div className="d-flex justify-content-between">
        <p>Order Id</p>
        <p>Date</p>
      </div>
      <div className="d-flex justify-content-between">
        <p>Total</p>
        <p>Coupon</p>
      </div>
      <div
        style={{
          maxHeight: "250px",
          overflowY: "auto",
        }}
      >
        <Table responsive>
          <thead style={{ backgroundColor: "#e4e4e4" }}>
            <tr>
              <th className="tableHeading">Product Name</th>
              <th className="tableHeading">Product Image</th>
              <th className="tableHeading">Quantity</th>
              <th className="tableHeading">SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {order?.length
              ? order.map((ord, ind) => (
                  <tr key={ind}>
                    <td>{ord?.id}</td>
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
