import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import {  remove_from_favourite } from "../../Store/actions/favouriteAction";
import "./style.css";
const Index = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.favouriteReducer);
  useEffect(() => {
    console.log(state);
  }, [state]);
  const removefav = (id) => {
    dispatch(remove_from_favourite(id));
  };
  return (
    <div className="mt-5 w-100">
      <div className="container table_fav_wrap text-center">
        <h1 className="text-center py-3 font-weight-bold">Wishlist</h1>
        <Table responsive className="w-100">
          <thead style={{ backgroundColor: "#e4e4e4" }}>
            <tr>
              <th className="pl_extra">Product Name</th>
              <th className="fav_table_heading">Price</th>
              <th className="fav_table_heading">Vendor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state?.favArray.map((item) => (
              <tr key={item.id}>
                <td
                  colSpan={1}
                  className="d-flex    align-items-center flex-row"
                >
                  <p className="mt-3" onClick={() => removefav(item.id)}>
                    X
                  </p>
                  <img
                    src={item?.itemImage}
                    alt={item?.itemName}
                    className="mx-5 "
                    style={{ width: "50px" }}
                  />
                  <p className="mt-2">{item?.itemName}</p>
                </td>
                <td className="pt-4 mt-0 ">{item?.range}</td>
                <td className="pt-4 ">Global Office</td>
                <td className="pt-3  mt-0">
                  <button className="btn btn-warning  btn-sm addFav_btn">
                    Add cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Index;
