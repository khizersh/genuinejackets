import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsBag, BsSearch } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

import "./style.css";

const WebNavbar = ({ categories }) => {
  const history = useHistory();
  const [isMobile, setIsMobile] = useState(true);
  const state = useSelector((state) => state.cartReducer.cartArray);
  const [dropdownOpen, setIsDropdownOpen] = useState(false);
  const [switchNavbar, setSwitchNavbar] = useState(false);
  const [isOpenBox, setIsOpenBox] = useState(null);

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
            <span className="icon-Hover d-flex flex-column mx-2 align-items-center justify-content-center">
              <BiUser className="icon" />
              <p className="icon_name">Sigin In</p>
            </span>

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

      <div className={`px-5 pb-5 bottom_nav ${switchNavbar ? "sticky_nav" : ""}`}>
        <div className="row align-items-center justify-content-center align-items-center">
          <div className="col-md-6  mt-0 d-flex justify-content-start align-items-center mt-2 navItemsList text-white p-0  ">
            {categories?.length
              ? categories.map((cat, ind) => (
                  <p
                    key={ind}
                    className="ml-4 hoverMe "
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
                        <span onClick={() => history.push("/categories")}>
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
