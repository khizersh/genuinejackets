import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiPagesLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";

import Sidebar from "../Sidebar/Index";
import "./style.css";
import { sign_Out_User } from "../../Store/actions/authAction";
import { empty_favourite } from "../../Store/actions/favouriteAction";
import { VscSignOut } from "react-icons/vsc";
import { toast } from "react-toastify";

const MobileNavbar = ({ categories }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const state = useSelector((state) => state.cartReducer.cartArray);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(user);
  }, []);
  const history = useHistory();
  const onSignOut = () => {
    console.log("signOut");
    dispatch(sign_Out_User());
    dispatch(empty_favourite());
    toast.success("SignOut Successfully");
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };
  return (
    <div className="main-MobileNavbar">
      <div className="divider d-flex justify-content-between align-items-center   w-100">
        <div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <GiHamburgerMenu onClick={() => setShowSidebar(!showSidebar)} />

            <img
              className="mobileLogo ml-3"
              src="https://www.ullapopken.com/medias/logo-ullapopken.svg?context=bWFzdGVyfGltYWdlc3w0MzI4fGltYWdlL3N2Zyt4bWx8aW1hZ2VzL2gxYS9oM2UvODgzMzg3NTExNjA2Mi5zdmd8ZjU3MDdiN2RhMGRlNWIwZDYyNTRkYzkxMWIyNTRmY2Q0OGEwMzFkYmU2MTZiODVhMWIwMzU3M2I0MTJkMzg4OQ"
              alt="logo"
            />
          </div>
        </div>
        <div>
          <div className="col-md-4 d-flex align-items-center justify-content-center ">
            {user ? (
              <div
                onClick={onSignOut}
                className="icon-Hover d-flex flex-column mx-2 align-items-center"
              >
               <VscSignOut className="icon" />
                <p className="icon_name">Sign Out</p>
              </div>
            ) : (
              <Link to="/signIn">
                <span className="icon-Hover d-flex flex-column mx-2 align-items-center">
                  <BiUser className="icon" />
                  <p className="icon_name ">Sign In</p>
                </span>
              </Link>
            )}
            <span className="icon-Hover d-flex flex-column mx-2 align-items-center position-relative">
              <span className="cartnumber">{state.length}</span>
              <RiPagesLine className="icon" />
              <p className="icon_name">Bag</p>
            </span>
          </div>
        </div>
      </div>
      <div className="col-md-6 d-flex justify-content-center searchBarMobile_Wrapper">
        <div className="d-flex justify-content-end align-items-center w-100">
          <input placeholder="Search" className="search-bar" />
          <BsSearch className="search-icon" />
        </div>
      </div>
      {/* {showSidebar === true && ( */}
      <div className={`${showSidebar ? "show" : "hide"}`}>
        <Sidebar
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
          categories={categories}
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default MobileNavbar;
