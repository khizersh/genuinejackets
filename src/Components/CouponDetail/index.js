import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import { getUserCoupons } from "../../api";
import "./style.css"
const CouponDetails = (props) => {
  const [couponsData, setCouponsData] = useState([]);
  const { id } = useSelector((state) => state.authReducer.user);
  const getCouponDetails = async () => {
    try {
      const { data } = await getUserCoupons(id);
      setCouponsData(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCouponDetails();
  }, []);
  return (
    <Table responsive>
      <thead style={{ backgroundColor: "#e4e4e4" }}>
        <tr>
          <th className="tableHeading">User Name</th>
          <th className="tableHeading">Coupon Id</th>
          <th className="tableHeading">Coupon Title</th>
          <th className="tableHeading">Used</th>
          <th className="tableHeading">Discount</th>
        </tr>
      </thead>
      <tbody>
        {couponsData?.map(
          ({ couponId, couponTitle, percentageOff, userName, used }) => (
            <tr>
              <td>{userName}</td>
              <td>{couponId}</td>
              <td>{couponTitle}</td>
              <td>
                {used === false ? (
                  <p className="text-success">Not Used</p>
                ) : (
                  <p className="text-danger">Used</p>
                )}
              </td>
              <td>{percentageOff}</td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};
export default CouponDetails;
