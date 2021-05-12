import { Fragment, useEffect, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../../Components/Footer";
import DescriptionTabs from "../../Components/DescriptionTabs";
import { getProductById, getPriceByAttruibute } from "../../api/index";
import { CURRENCY } from "../../constant";
import { add_to_cart } from "../../Store/actions/cart";
import "./style.css";

const ProductDescription = () => {
  const cart = useSelector((state) => state.cartReducer.cartArray);
  const [images, setImages] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [color, setColor] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [detail, setDetail] = useState();
  useEffect(() => {
    getProductByIdWrapper();
  }, []);
  const getProductByIdWrapper = async () => {
    const data = await getProductById(slug);
    if (data.data?.imageList?.length) {
      let arr = data.data?.imageList.map((img) => ({
        original: img.image,
        thumbnail: img.image,
      }));
      console.log(arr);
      setImages(arr);
    }
    // setImages(data.data?.imageList);
    setDetail(data.data);
  };

  const addtocart = () => {
    if (attribute.length !== detail?.attributeList?.length)
      return toast.warning("Select All Attributes");
    console.log("detail: ", detail);
    let cartItemObj = {
      id: detail.id,
      itemName: detail?.title,
      itemImage: detail.imageList[0].image,
      price: price,
      attribute: attribute,
      quantity,
    };

    dispatch(add_to_cart(cartItemObj));
    toast.success("Added To Cart");
  };

  const onChangeAtrribute = async (val, ind) => {
    let dup = attribute;
    dup[ind] = val;
    // console.log(val);
    setColor(val);
    setAttribute(dup);

    // console.log(ind);
    // console.log(attribute);
    // console.log(detail?.attributeList);
    // console.log(detail?.attributeList[ind].multi);
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
      console.log(attrData);
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
      try {
        let data = await getPriceByAttruibute({
          productId: detail?.id,
          list: attribute,
        });
        setPrice(data?.data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="my-5">
      <div className="container">
        <div className="row w-100 ">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            {images?.length ? (
              <ImageGallery
                items={images}
                showThumbnails={true}
                showBullets={false}
                showNav={false}
                showPlayButton={false}
                thumbnailPosition={"left"}
                infinite={true}
                useBrowserFullscreen={true}
                showFullscreenButton={true}
              />
            ) : null}
          </div>
          <div className="col-md-6 marginTopAndBottom">
            <p className="product-title">{detail?.title}</p>
            <p className="product-price mt-1">
              {CURRENCY} {price ? price : detail?.range}
            </p>
            <p className="product-description mt-1">{detail?.description}</p>
            <FormGroup>
              {detail
                ? detail?.attributeList.map((attribute, index) => (
                    <div className="mt-3" key={index}>
                      <Label for="exampleSelect" className="attributes-heading">
                        {attribute?.parentTitle}:
                      </Label>
                      {/* {attribute?.parentTitle.toLowerCase() === "color" && */}
                      {attribute?.multi ? (
                        <div>
                          {attribute?.childAttributeList?.length
                            ? attribute?.childAttributeList.map((attr, ind) =>
                                attr?.attributeImage?.length
                                  ? attr?.attributeImage.map((attr_img, i) => {
                                      if (i == 0) {
                                        return (
                                          <span className="d-inline-block">
                                          <p className="text-center mb-2">{attr.title}</p>
                                            <img
                                              src={attr_img}
                                              key={i}
                                              width={55}
                                              height={65}
                                              className="p-1 m-1 attribute-img rounded-circle"
                                              onClick={() =>
                                                onChangeAtrribute(
                                                  attr?.title,
                                                  index
                                                )
                                              }
                                            />
                                          </span>
                                        );
                                      }
                                    })
                                  : null
                              )
                            : null}
                        </div>
                      ) : (
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
                      )}
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
              </div>
              <div>
                <button
                  className="btn btn-info "
                  onClick={addtocart}
                  disabled={cart.some((e) => +e.id === +slug)}
                >
                  Add to Cart
                </button>
              </div>
              <div>
                <button className="btn btn-dark">Buy Now</button>
              </div>
            </div>
            <div className="mt-3">
              {/* <p>SKU: ahoooo1</p> */}
              <div className="product-description-links">
                Categories:{" "}
                <Link to={`/category/${detail?.categoryId}`}>
                  {detail?.categoryName}
                </Link>
              </div>
              {/* <div className="product-description-links">
                Tags: <span>Dress</span>,<span>Women</span>
              </div> */}
            </div>
            <div className="mt-3 d-flex">
              Share :{" "}
              <span className="description-social-icon-wrapper">
                <FaFacebookF className="description-social-icon" />
              </span>
              <span className="description-social-icon-wrapper">
                <FaPinterestP className="description-social-icon" />
              </span>
              <span className="description-social-icon-wrapper">
                <FaTwitter className="description-social-icon" />
              </span>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <section className="mt-5">
          <DescriptionTabs detail={detail} />
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default ProductDescription;
