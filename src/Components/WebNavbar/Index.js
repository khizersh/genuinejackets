import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsBag, BsSearch } from "react-icons/bs";
import { RiPagesLine } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import logo from "../../assets/images/Position1.png";
import name from "../../assets/images/Position2.png";

import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Dropdown,
} from "reactstrap";

import "./style.css";
import { sign_Out_User } from "../../Store/actions/authAction";
import { empty_favourite } from "../../Store/actions/favouriteAction";
import { change_curreny_type } from "../../Store/actions/currenyActions";
import { empty_cart } from "../../Store/actions/cart";
const WebNavbar = ({ categories }) => {
  const [isMobile, setIsMobile] = useState(true);
  const state = useSelector((state) => state.cartReducer.cartArray);
  const fav_Array = useSelector((state) => state.favouriteReducer.favArray);
  const curreny_type_State = useSelector(
    (state) => state.currencyReducer.currency_Value
  );
  const user = useSelector((state) => state.authReducer.user);

  const [dropdownOpen, setIsDropdownOpen] = useState(false);
  const [authDropDown, setAuthDropDown] = useState(false);
  const [switchNavbar, setSwitchNavbar] = useState(false);
  const [isOpenBox, setIsOpenBox] = useState(null);
  const [search, setSearch] = useState("");
  const [currencyDropDown, setCurrencyDropDown] = useState(false);
  const [currValue, setCurrValue] = useState("USD");
  const history = useHistory();
  const dispatch = useDispatch();
  const handleCurrencyDropDown = (e) =>
    setCurrencyDropDown((prevState) => !prevState);
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
    setCurrValue(curreny_type_State);
  }, [isMobile]);

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
    dispatch(empty_favourite());
    toast.success("SignOut Successfully");
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  const onSearch = () => {
    history.push({
      pathname: "/search",
      search: `?${search}`,
    });
  };
  const handleSelectCurrency = ({ currentTarget: { textContent } }) => {
    if (state.length || fav_Array?.length) {
      Swal.fire({
        title: "Do you want to Change the Currency Type ?",
        showCancelButton: true,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(empty_cart());
          dispatch(empty_favourite());
          Swal.fire("Currency Changed");
          dispatch(change_curreny_type(textContent));
          setCurrValue(textContent);
        } else {
          return;
        }
      });
    } else {
      dispatch(change_curreny_type(textContent));
      setCurrValue(textContent);
    }
  };

  return (
    <div className="main-webnavbar">
      <div className={`${isMobile ? "container" : "container-fluid"}  `}>
        <div className="row topNavbar justify-content-between">
          <div className=" d-flex justify-content-center">
            <div>
              <Link to="/">
                <img className="logo" alt="The Genuine Jackets" src={logo} />
              </Link>
            </div>
          </div>
          {/* d-flex justify-content-start */}
          <div className="d-flex justify-content-center m-auto">
            <Link to="/">
              <img className="web-name" alt="The Genuine Jackets" src={name} />
            </Link>
          </div>

          <div className=" d-flex justify-content-end align-items-center">
            <span className="mb-3 mr-4">
              <Dropdown
                isOpen={currencyDropDown}
                toggle={handleCurrencyDropDown}
                className="currencyDropdown"
              >
                <DropdownToggle>
                  {currValue} <BiDownArrow />{" "}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={(e) => handleSelectCurrency(e)}>
                    USD
                  </DropdownItem>
                  <DropdownItem onClick={(e) => handleSelectCurrency(e)}>
                    EUR
                  </DropdownItem>
                  <DropdownItem onClick={(e) => handleSelectCurrency(e)}>
                    CAD
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </span>
            {!user ? (
              <span className="icon-Hover d-flex flex-column mx-2 align-items-center justify-content-center">
                <Link
                  to="/signIn"
                  className="d-flex flex-column  align-items-center justify-content-center "
                >
                  <BiUser className="icon text-dark" />
                  <p className="icon_name">Sign In</p>
                </Link>
              </span>
            ) : (
              <span className="icon-Hover d-flex flex-column mx-2 align-items-center justify-content-center">
                <UncontrolledDropdown
                  isOpen={authDropDown}
                  onMouseEnter={() => setAuthDropDown(true)}
                  onMouseLeave={() => setAuthDropDown(false)}
                  style={{ transition: "0.5s" }}
                >
                  <DropdownToggle
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                      border: "none",
                      margin: 0,
                      outline: "none",
                      transition: "0.5s",
                    }}
                    className="categoryButton authButtonItem"
                  >
                    <div className="d-flex flex-column align-items-center  text-dark">
                      <BiUser className="icon text-dark" />
                      <p className="icon_name">{user?.fullName}</p>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => history.push(`/accountInformation`)}
                      className=" dropdownItem"
                    >
                      Account Information
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => history.push(`/wishlist`)}
                      className=" dropdownItem"
                    >
                      WishList
                    </DropdownItem>
                    <DropdownItem onClick={onSignOut} className=" dropdownItem">
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </span>
            )}

            <span className="icon-Hover d-flex flex-column mx-2 align-items-center justify-content-center">
              <BsBag className="icon" />
              <Link to="/favourite">
                <p className="icon_name">Favourites</p>
              </Link>
            </span>
            <Link to="/cart">
              <span className="icon-Hover d-flex flex-column mx-2 align-items-center justify-content-center position-relative">
                <span className="cartnumber">{state.length}</span>
                <RiPagesLine className="icon" />
                <p className="icon_name">Bag</p>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom  */}

      <div className={`px-5 bottom_nav ${switchNavbar ? "sticky_nav" : ""}`}>
        <div className="d-flex align-items-center justify-content-center ">
          <div className="col-md-6 text-white d-flex align-items-center web-dropdown">
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
                          onClick={() => history.push(`/categories/${cat?.id}`)}
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
          <div className="col-md-6 d-flex justify-content-center ">
            <div className="d-flex justify-content-end align-items-center w-100 search">
              <input
                placeholder="Search"
                className="search-bar"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <BsSearch className="search-icon" onClick={onSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebNavbar;
