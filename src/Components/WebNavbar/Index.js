import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsBag, BsSearch } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import {  VscSignOut} from "react-icons/vsc";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

import "./style.css";
import { sign_Out_User } from "../../Store/actions/authAction";

const WebNavbar = ({ categories }) => {
  const [isMobile, setIsMobile] = useState(true);
  const state = useSelector((state) => state.cartReducer.cartArray);
  const user = useSelector((state) => state.authReducer.user);
  const [dropdownOpen, setIsDropdownOpen] = useState(false);
  const [switchNavbar, setSwitchNavbar] = useState(false);
  const [isOpenBox, setIsOpenBox] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setSwitchNavbar(true);
    } else {
      setSwitchNavbar(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth >= 768;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
    console.log(user);
  }, [isMobile]);

  // const toggle = () => {
  //   setIsDropdownOpen(!dropdownOpen);
  // };

  const onMouseEnter = (a) => {
    setIsOpenBox(a);
    setIsDropdownOpen(true);
  };

  const onMouseLeave = () => {
    setIsOpenBox(null);
    setIsDropdownOpen(false);
  };

  const onSignOut = () => {
    dispatch(sign_Out_User());
    setTimeout(() => {
      history.push("/");
    }, 1000);
  }

  return (
    <div className="main-webnavbar">
      <div className={`${isMobile ? "container" : "container-fluid"}  `}>
        <div className="row topNavbar justify-content-between">
          <div className=" d-flex justify-content-start "></div>
          <div className=" d-flex justify-content-center">
            <div>
              <Link to="/">
                <img
                  className="logo"
                  src="https://www.ullapopken.com/medias/logo-ullapopken.svg?context=bWFzdGVyfGltYWdlc3w0MzI4fGltYWdlL3N2Zyt4bWx8aW1hZ2VzL2gxYS9oM2UvODgzMzg3NTExNjA2Mi5zdmd8ZjU3MDdiN2RhMGRlNWIwZDYyNTRkYzkxMWIyNTRmY2Q0OGEwMzFkYmU2MTZiODVhMWIwMzU3M2I0MTJkMzg4OQ"
                  alt="logo"
                />
              </Link>
            </div>
          </div>
          <div className=" d-flex justify-content-end align-items-center">
            {!user ? (
              <Link to="/signIn">
                <span className="icon-Hover d-flex flex-column mx-2 align-items-center justify-content-center">
                  <BiUser className="icon" />
                  <p className="icon_name">Sign In</p>
                </span>
              </Link>
            ) : (
                <span className="icon-Hover d-flex flex-column mx-2 align-items-center justify-content-center" onClick={onSignOut}>
                  <VscSignOut className="icon" />
                  <p className="icon_name">Sign Out</p>
                </span>
            )}
            

            <span className="icon-Hover d-flex flex-column mx-2 align-items-center justify-content-center">
              <BsBag className="icon" />
              <p className="icon_name">Favourites</p>
            </span>
            <Link to="/cart">
              <span className="icon-Hover d-flex flex-column mx-2 align-items-center justify-content-center">
                <span className="cartnumber">{state.length}</span>
                <IoCartOutline className="icon" size={20} />
                <p className="icon_name">Bag</p>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom  */}

      <div
        className={`px-5 pb-5 bottom_nav ${switchNavbar ? "sticky_nav" : ""}`}
      >
        <div className="row align-items-center justify-content-center ">
          <div className="col-md-6 text-white p-0 d-flex align-items-center mt-2 ">
            {" "}
            {categories?.length
              ? categories.map((cat, ind) => (
                  <p
                    key={ind}
                    className="ml-4 "
                    onMouseOver={() => onMouseEnter(ind)}
                  >
                    <UncontrolledDropdown
                      onMouseLeave={onMouseLeave}
                      isOpen={isOpenBox === ind ? true : false}
                    >
                      <DropdownToggle
                        style={{
                          backgroundColor: "transparent",
                          color: "white",
                          border: "none",
                          margin: 0,
                        }}
                        className="categoryButton"
                      >
                        <span
                          onClick={() => history.push("/categories")}
                          className="  "
                        >
                          {cat?.title}
                        </span>
                      </DropdownToggle>
                      <DropdownMenu className="dropdownMenu">
                        {cat?.childList?.length
                          ? cat?.childList.map((child_cat, index) => {
                              let title = child_cat?.childTitle
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-");
                              return (
                                <DropdownItem
                                  className="dropdownItem"
                                  key={index}
                                  onClick={() =>
                                    history.push(
                                      `/category/${title}/${child_cat?.id}`
                                    )
                                  }
                                >
                                  {/* <Link to={}> */} {child_cat?.childTitle}
                                  {/* </Link>/ */}
                                </DropdownItem>
                              );
                            })
                          : null}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </p>
                ))
              : null}
            {/* </Dropdown> */}
          </div>
          <div className="col-md-6 d-flex justify-content-center searchBar_Wrapper">
            <div className="d-flex justify-content-end align-items-center w-100">
              <input placeholder="Search" className="search-bar" />
              <BsSearch className="search-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebNavbar;
