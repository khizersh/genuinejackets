import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { remove_from_favourite } from "../../Store/actions/favouriteAction";
import "./style.css";
const Index = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.favouriteReducer);
  useEffect(() => {
    console.log(state);
  }, [state]);
  const removefav = (id) => {
    dispatch(remove_from_favourite(id));
    toast.error("Removed From Favourites");
  };
  return (
    <div className="mt-5 w-100">
      <div className="container table_fav_wrap ">
        <h1 className="text-center py-3 font-weight-bold">Wishlist</h1>
        <Table responsive className="w-100">
          <thead style={{ backgroundColor: "#e4e4e4" }}>
            <tr>
              <th className="pl_extra">Product Name</th>
              <th className="fav_table_heading">Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state?.favArray.map((item) => (
              <tr key={item.id}>
                <td colSpan={1} className="d-flex align-items-center flex-row -t-2 ">
                  <p
                    className="mt-3 flex-start cursor-pointer"
                    onClick={() => removefav(item.id)}
                  >
                    X
                  </p>
                  <div className="d-flex align-items-center flex-row">
                    <img
                      src={item?.itemImage}
                      alt={item?.itemName}
                      className="ml-5 mL_image"
                      style={{ width: "50px" }}
                    />
                    <Link to={`/product/${item?.name}/${item?.id}`}>
                      <p className="mt-2 ml-3 text-info">{item?.itemName}</p>
                    </Link>
                  </div>
                </td>
                <td className="pt-4 mt-0 text-center">{item?.range}</td>
                <td className="pt-3  mt-0 text-center">
                  <Link to={`/product/${item?.name}/${item?.id}`}>
                    <button className="btn btn-warning  btn-sm addFav_btn">
                      View Detail
                    </button>
                  </Link>
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
