import { Fragment, useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Slider from "react-animated-slider";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-animated-slider/build/horizontal.css";

import { add_to_cart } from "../../Store/actions/cart";
import { CURRENCY } from "../../constant";
import { getPriceByAttruibute } from "../../api";

const CustomModal = (props) => {
  const { detail, className, showModal, setShowModal } = props;
  const cart = useSelector((state) => state.cartReducer.cartArray);
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState(showModal);
  const [attribute, setAttribute] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const toggle = () => {
    setShowModal(!props.showModal);
    setModal(!modal);
  };

  useEffect(() => {
    if (detail?.imageList?.length) {
      let arr = detail?.imageList.map((img) => ({
        original: img.image,
        thumbnail: img.image,
      }));
      setImages(arr);
    }
  }, [detail.id]);

  const addtocart = () => {
    if (attribute.length !== detail?.attributeList?.length)
      return toast.warning("Select All Attributes");
    let cartItemObj = {
      id: detail.id,
      itemName: detail?.title,
      itemImage: detail.imageList[0].picByte,
      price: price,
      attribute: attribute,
      quantity,
    };
    // console.log(cartItemObj);
    dispatch(add_to_cart(cartItemObj));
    toast.success("Added To Cart");
  };

  const onChangeAtrribute = async (val, ind) => {
    let dup = attribute;
    dup[ind] = val;
    // console.log(ind);
    setAttribute(dup);

    // console.log(detail?.attributeList);
    if (!val) {
      let arr = detail?.imageList.map((img) => ({
        original: img.image,
        thumbnail: img.image,
      }));
      return setImages(arr);
    }

    if (detail?.attributeList[ind].multi) {
      let attrData = detail?.attributeList[ind].childAttributeList.find(
        (e) => e.title === dup[ind]
      );
      // console.log(attrData);
      if (attrData && attrData.attributeImage?.length) {
        // console.log(attrData.attributeImage);
        let imgArr = attrData.attributeImage.map((img) => ({
          original: img,
          thumbnail: img,
        }));
        // console.log(imgArr);
        setImages(imgArr);
      }
    }
    if (attribute.length === detail?.attributeList?.length) {
      let {
        data: { price },
      } = await getPriceByAttruibute({
        productId: detail?.id,
        list: attribute,
      });
      setPrice(price);
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
                {CURRENCY} {price ? price : detail?.range}
              </p>
              <p className="product-description my-3">{detail?.description}</p>
              <FormGroup>
                {detail
                  ? detail?.attributeList.map((attribute, index) => (
                      <Fragment key={index}>
                        <Label
                          for="exampleSelect"
                          className="attributes-heading"
                        >
                          {attribute?.parentTitle}
                        </Label>
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
                              Select {attribute?.parentTitle.toLowerCase()}
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
                      </Fragment>
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
                </div>
                <div>
                  <button
                    className="btn btn-info btn-md mx-3"
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
