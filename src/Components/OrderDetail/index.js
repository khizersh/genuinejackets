import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import { getUserOrders } from "../../api";
import { AiOutlineLeft } from "react-icons/ai";
const Orders = ({ showOrderDetails }) => {
  return (
    <div className="h-100 ">
      <AiOutlineLeft
        size={26}
        className="my-2"
        onClick={() => showOrderDetails(false)}
      />
      <div className="d-flex justify-content-between">
        <p>some refrence</p>
        <p>some refrence</p>
      </div>
      <div className="d-flex justify-content-between">
        <p>some refrence</p>
        <p>some refrence</p>
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
          <tbody
            
          >
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
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Orders;
