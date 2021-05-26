import { Fragment, useEffect, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactStars from "react-rating-stars-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import DescriptionTabs from "../../Components/DescriptionTabs";
import {
  getProductById,
  getPriceByAttruibute,
  getProductsByCategory,
} from "../../api/index";
import { CURRENCY } from "../../constant";
import { add_to_cart } from "../../Store/actions/cart";
import SliderCard from "../../Components/Cards/SliderCard";
import "./style.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 390,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

const ProductDescription = () => {
  const cart = useSelector((state) => state.cartReducer.cartArray);
  const [images, setImages] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [color, setColor] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const { slug } = useParams();
  const [detail, setDetail] = useState();
  const [products, setProducts] = useState([]);
  const [isActive, setisActive] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    getProductByIdWrapper();
    window.scrollTo(0, 0);
  }, [slug]);
  const getProductByIdWrapper = async () => {
    const data = await getProductById(slug);
    if (data.data?.imageList?.length) {
      let arr = data.data?.imageList.map((img) => ({
        original: img.image,
        thumbnail: img.image,
      }));
      setImages(arr);
    }
    // setImages(data.data?.imageList);
    setDetail(data.data);
    getProducts(data?.data?.categoryId);
  };
  const getProducts = async (id) => {
    try {
      const { data } = await getProductsByCategory(id);
      const validProducts = data.filter((product) => product.range);
      setProducts(validProducts);
    } catch (error) {
      console.log(error);
    }
  };
  const addtocart = () => {
    if (attribute.length !== detail?.attributeList?.length)
      return toast.warning("Select All Attributes");
    // console.log("detail: ", detail);
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

  const onChangeAtrribute = async (val, ind,i) => {
    let dup = attribute;
    dup[ind] = val;
    setColor(val);
    setAttribute(dup);
    setisActive(i);
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
      if (attrData && attrData.attributeImage?.length) {
        let imgArr = attrData.attributeImage.map((img) => ({
          original: img,
          thumbnail: img,
        }));
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
      } catch (error) {}
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
            <div className="d-flex align-items-center">
              <ReactStars
                count={5}
                onChange={(ratingChanged) => console.log(ratingChanged)}
                size={24}
                isHalf={true}
                edit={false}
                value={detail?.review}
              />{" "}
              ({detail?.reviewCount})
            </div>
            <div className="mt-3">
              <ul className="pl-3">
                {detail?.bulletList?.length ? detail?.bulletList.map((list,i) => (
                  <li key={i}>{list?.point}</li>
                )): null}
              </ul>
            </div>
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
                                              src={attr_img}
                                              key={i}
                                              width={55}
                                              height={65}
                                              className={"p-1 m-1 attribute-img rounded-circle " + (isActive === ind ? "img-active" : "")}
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
                <button className="btn ml-3 btn-buy">Buy Now</button>
              </div>
            </div>
            <div className="mt-3">
              {/* <p>SKU: ahoooo1</p> */}
              <div className="product-description-links">
                Categories:{" "}
                <Link to={`/category/${detail?.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${detail?.categoryId}`}>
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
        <section className="mt-5 mb-5">
          <DescriptionTabs detail={detail} />
        </section>
        <hr />
        <section className="mt-5">
          <h3>Related Items</h3>
          <Slider {...settings}>
            {products.map((product, ind) => (
              <div key={ind}>
                <SliderCard pro={product} />
              </div>
            ))}
          </Slider>
        </section>
      </div>
    </div>
  );
};

export default ProductDescription;
