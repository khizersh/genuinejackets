import React, { useEffect } from "react";
import "./index.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiPower } from "react-icons/fi";
import { ImSwitch } from "react-icons/im";
import { useParams } from "react-router";
import { useState } from "react";
import AccountForm from "../../Components/AccountForm";
import WishList from "../../Components/WishList";
import Logout from "../../Components/Logout";
import { useHistory } from "react-router";
const Index = () => {
  const history = useHistory();
  const { slug } = useParams();
  console.log(slug);
  const [isActive, setIsActive] = useState("accountInformation");
  const [title, setTitle] = useState("");
  const customRender = () => {
    if (isActive === "accountInformation") {
      return <AccountForm />;
    } else if (isActive === "wishlist") {
      return <WishList />;
    } else if (isActive === "logout") {
      return <Logout />;
    }
  };
  useEffect(() => {
    setIsActive(slug);
  }, [slug]);
  return (
    <div className="h-full py-5 px-5 mt-4 accountWrapper">
      <div className="container-fluid row no-gutters">
        <div className="col-md-3 m-0 p-0">
          <div className="d-flex align-items-center">
            <img
              src="https://blindspotetc.com/wp-content/uploads/2019/03/dummy-man-570x570.png"
              className="userImage"
              alt=""
            />
            <div className="ml-2">
              <p className="m-0 text-muted">user</p>
              <h5 className="text-dark font-weight-bold">user@user.com</h5>
            </div>
          </div>
          <div className="mt-3 sideWrapper">
            <div
              onClick={() => history.push("accountInformation")}
              className={`sideItem ${
                isActive === "accountInformation" ? "active" : ""
              }`}
            >
              <p className="pt-2">
                <FaRegUser />
              </p>
              <p className="ml-2 mb-0">Account Information</p>
            </div>
            <div
              onClick={() => history.push("wishlist")}
              className={`sideItem ${isActive === "wishlist" ? "active" : ""}`}
            >
              {" "}
              <p className="pt-2">
                <AiOutlineHeart />
              </p>
              <p className="ml-2 mb-0">WishList</p>
            </div>
            <div
              onClick={() => history.push("logout")}
              className={`sideItem ${isActive === "logout" ? "active" : ""}`}
            >
              {" "}
              <p className="pt-2">
                <FiPower />
              </p>
              <p className="ml-2 mb-0">Logout</p>
            </div>
          </div>
        </div>
        <div className="col-md-9 m-0 p-0 ">
          <h3 className="font-weight-bold ">{slug.charAt(0).toUpperCase() + slug.slice(1)}</h3>
          <hr />
          <div className="right_wrapper p-3 d-flex justify-content-center align-items-center text-" >{customRender()}</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
