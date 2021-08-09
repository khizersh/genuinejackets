import { Fragment, useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Slider from "react-animated-slider";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-animated-slider/build/horizontal.css";

import { add_to_cart } from "../../Store/actions/cart";
import { CURRENCY } from "../../constant";
import { getPriceByAttruibute } from "../../api";
import { add_to_favourite } from "../../Store/actions/favouriteAction";

const CustomModal = (props) => {
  const favourites = useSelector((state) => state.favouriteReducer.favArray);
  const isUser = useSelector((state) => state.authReducer);
  const [isAdded, setIsAdded] = useState(false);
  const { detail, className, showModal, setShowModal } = props;
  const cart = useSelector((state) => state.cartReducer.cartArray);
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState(showModal);
  const [attribute, setAttribute] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [isActive, setisActive] = useState("");
  const [range, setRange] = useState("");
  const curreny_type_State = useSelector(
    (state) => state.currencyReducer.currency_Value
  );
  const dispatch = useDispatch();
  const toggle = () => {
    setShowModal(!props.showModal);
    setModal(!modal);
  };

  useEffect(() => {
    if (detail?.imageList?.length) {
      let arr = detail?.imageList.map((img) => ({
        original: img?.image,
        thumbnail: img?.image,
      }));
      setImages(arr);
    }
    const favCheck = favourites.find((item) => item.id === detail?.id);
    favCheck ? setIsAdded(true) : setIsAdded(false);
    if (curreny_type_State === "CAD") {
      setRange(detail?.angeCad);
    } else if (curreny_type_State === "EUR") {
      setRange(detail?.rangeEuro);
    } else {
      setRange(detail?.range);
    }
  }, [detail.id]);

  const addtocart = () => {
    if (attribute.length !== detail?.attributeList?.length)
      return toast.warning("Select All Attributes");
    let cartItemObj = {
      id: detail.id,
      itemName: detail?.title,
      itemImage: detail.imageList[0].image,
      price: price?.price,
      priceId: price?.priceId,
      attribute: attribute,
      quantity,
    };
    // console.log(cartItemObj);
    dispatch(add_to_cart(cartItemObj));
    toast.success("Added To Cart");
  };

  const addtofav = () => {
    console.log(isAdded);
    const { user } = isUser;
    let cartItemObj = {
      id: detail.id,
      itemName: detail?.title,
      itemImage: detail.imageList[0].image,
      price: price?.price,
      priceId: price?.priceId,
      attribute: attribute,
      quantity,
    };
    // console.log(user);
    if (user) {
      dispatch(add_to_favourite(cartItemObj));
      toast.success("Added To Favourite");
      setIsAdded(true);
    } else {
      toast.warning("Please Sign In");
    }
  };
  const onChangeAtrribute = async (val, ind, i) => {
    let dup = attribute;
    dup[ind] = val;
    // console.log(ind);
    setAttribute(dup);
    setisActive(i);
    // console.log(detail?.attributeList);
    if (!val) {
      let arr = detail?.imageList.map((img) => ({
        original: img?.image,
        thumbnail: img?.image,
      }));
      return setImages(arr);
    }

    if (detail?.attributeList[ind].multi) {
      let attrData = detail?.attributeList[ind].childAttributeList.find(
        (e) => e.title === dup[ind]
      );
      // console.log(attrData);
      if (attrData && attrData.attributeImageFull?.length) {
        // console.log(attrData.attributeImage);
        let imgArr = attrData.attributeImageFull.map((img) => ({
          original: img?.image,
          thumbnail: img?.image,
        }));
        // console.log(imgArr);
        setImages(imgArr);
      }
    }
    if (attribute.length === detail?.attributeList?.length) {
      let data = await getPriceByAttruibute({
        productId: detail?.id,
        list: attribute,
      });
      console.log(data);
      let obj = {
        price: data?.data?.price,
        priceId: data?.data?.priceId,
      };
      setPrice(obj);
    }
  };

  return (
    <div>
      <Modal
        centered={true}
        size="lg"
        style={{ maxWidth: "900px", width: "100%" }}
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle} style={{ border: "none" }}></ModalHeader>
        <ModalBody style={{ minHeight: "500px", width: "100%" }}>
          <div className="row w-100 ">
            <div className="col-md-6  d-flex justify-content-center align-items-center">
              <Slider>
                {images?.length
                  ? images.map((slide, index) => (
                      <img
                        key={index}
                        src={slide.original}
                        style={{ width: "400px", height: "500px" }}
                        alt={`img-${index}`}
                      />
                    ))
                  : null}
              </Slider>
            </div>
            <div className="col-md-6 marginTopAndBottom  ">
              <p className="product-title">{detail.title}</p>
              <p className="product-price my-3">
                {curreny_type_State === "EUR" ? "€" : CURRENCY}{" "}
                {price && price.price ? price?.price : range}
              </p>
              <p
                className="product-description my-3"
                dangerouslySetInnerHTML={{ __html: detail?.description }}
              />
              <FormGroup>
                {detail
                  ? detail?.attributeList.map((attribute, index) => (
                      <div className="mt-3" key={index}>
                        <Label
                          for="exampleSelect"
                          className="attributes-heading"
                        >
                          {attribute?.parentTitle}
                          {":"}
                        </Label>
                        {/* {attribute?.parentTitle.toLowerCase() === "color" && */}
                        {attribute?.multi ? (
                          <div>
                            {attribute?.childAttributeList?.length
                              ? attribute?.childAttributeList.map((attr, ind) =>
                                  attr?.attributeImageFull?.length
                                    ? attr?.attributeImageFull.map(
                                        (attr_img, i) => {
                                          if (i === 0) {
                                            return (
                                              <span
                                                className="d-inline-block"
                                                key={ind}
                                              >
                                                <p className="text-center mb-2">
                                                  {attr.title}
                                                </p>
                                                <img
                                                  src={attr_img?.image}
                                                  key={i}
                                                  width={55}
                                                  height={65}
                                                  className={
                                                    "p-1 m-1 attribute-img rounded-circle " +
                                                    (isActive === ind
                                                      ? "img-active"
                                                      : "")
                                                  }
                                                  onClick={() =>
                                                    onChangeAtrribute(
                                                      attr?.title,
                                                      index,
                                                      ind
                                                    )
                                                  }
                                                />
                                              </span>
                                            );
                                          }
                                        }
                                      )
                                    : null
                                )
                              : null}
                          </div>
                        ) : detail ? (
                          <Input
                            type="select"
                            name="select"
                            id="exampleSelect"
                            onChange={(e) =>
                              onChangeAtrribute(e.target.value, index)
                            }
                          >
                            <>
                              <option
                                className="custom-option-description"
                                value=""
                              >
                                Select {attribute?.parentTitle?.toLowerCase()}
                              </option>
                              {attribute?.childAttributeList?.length
                                ? attribute?.childAttributeList.map(
                                    (attr, ind) => (
                                      <option
                                        className="custom-option-description"
                                        value={attr?.title}
                                        key={ind}
                                      >
                                        {attr?.title}
                                      </option>
                                    )
                                  )
                                : null}
                            </>
                          </Input>
                        ) : null}
                      </div>
                    ))
                  : null}
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                  <div
                    className="custom-box"
                    onClick={() =>
                      setQuantity(quantity <= 1 ? quantity - 0 : quantity - 1)
                    }
                  >
                    -
                  </div>
                  <div className="custom-box">{quantity}</div>
                  <div
                    className="custom-box"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </div>
                  <span onClick={addtofav}>
                    {isAdded ? (
                      <AiFillHeart
                        size={30}
                        className="ml-1 cursor-pointer"
                        style={{ color: "red" }}
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="ml-1 cursor-pointer"
                      />
                    )}
                  </span>
                </div>
                <div>
                  <button
                    className="btn btn-info btn-md mx-1"
                    onClick={addtocart}
                    disabled={cart.some((e) => +e.id === +detail?.id)}
                  >
                    Add to Cart
                  </button>
                </div>
                <div>
                  <button className="btn btn-dark btn-md">Buy Now</button>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CustomModal;
