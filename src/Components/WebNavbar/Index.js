import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsBag, BsSearch } from "react-icons/bs";
import { RiPagesLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
const WebNavbar = ({ categories }) => {
  const [isMobile, setIsMobile] = useState(true);
  const state = useSelector((state) => state.cartReducer.cartArray);
  const [dropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpenBox, setIsOpenBox] = useState(null);

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
                <RiPagesLine className="icon" />
                <p className="icon_name">Bag</p>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom  */}

      <div className={`${isMobile ? "container" : "container-fluid"} `}>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-6 d-flex justify-content-start align-items-center mt-2 navItemsList p-0  ">
            {categories?.length
              ? categories.map((cat, ind) => (
                  <p
                    key={ind}
                    className="nav-item ml-4 hoverMe"
                    onMouseOver={() => onMouseEnter(ind)}
                  >
                    <UncontrolledDropdown
                      onMouseLeave={onMouseLeave}
                      isOpen={isOpenBox === ind ? true : false}
                    >
                      <DropdownToggle
                        style={{
                          backgroundColor: "transparent",
                          color: "black",
                          border: "none",
                          margin: 0,
                        }}
                        className="categoryButton"
                      >
                        {cat?.title}
                      </DropdownToggle>
                      <DropdownMenu className="dropdownMenu">
                        {cat?.childList?.length
                          ? cat?.childList.map((child_cat, index) => (
                              <DropdownItem
                                className="dropdownItem"
                                key={index}
                              >
                                <Link to={`/category/${child_cat?.id}`}>
                                  {" "}
                                  {child_cat?.childTitle}
                                </Link>
                              </DropdownItem>
                            ))
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
