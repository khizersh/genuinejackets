import { useEffect, useRef, useState } from "react";
import {
  FormGroup,
  Input,
  Label,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
} from "reactstrap";
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import ImageGallery from "react-image-gallery";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import ReactStars from "react-rating-stars-component";
import ImageModal from "../../Components/ImageModal";
import SkeletonCard from "../../Components/SkeletonCard/index";
import SkeletonGallery from "../../Components/SkeletonCard/SkeletonGallery/index";
import "slick-carousel/slick/slick.css";
import Scrollspy from "react-scrollspy";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "slick-carousel/slick/slick-theme.css";

import DescriptionTabs from "../../Components/DescriptionTabs";
import {
  getProductById,
  getPriceByAttruibute,
  getProductsByCategory,
} from "../../api/index";
import { CURRENCY } from "../../constant";
import { add_to_cart } from "../../Store/actions/cart";
import { add_to_favourite } from "../../Store/actions/favouriteAction";
import SliderCard from "../../Components/Cards/SliderCard";
import "./style.css";
import Skeleton from "react-loading-skeleton";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: 390,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        dots: true,
        arrows: false,
      },
    },
  ],
};

const ProductDescription = () => {
  const cart = useSelector((state) => state.cartReducer.cartArray);
  const favourites = useSelector((state) => state.favouriteReducer.favArray);
  const isUser = useSelector((state) => state.authReducer);
  const [isAdded, setIsAdded] = useState(false);
  const [images, setImages] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [color, setColor] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const { slug } = useParams();
  const [detail, setDetail] = useState();
  const [products, setProducts] = useState([]);
  const [isActive, setisActive] = useState("");
  const [indexNumber, setIndexNumber] = useState();
  const [range, setRange] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);

  const curreny_type_State = useSelector(
    (state) => state.currencyReducer.currency_Value
  );
  const dispatch = useDispatch();
  const myRef = useRef();
  useEffect(() => {
    getProductByIdWrapper();

    window.scrollTo(0, 0);
  }, [slug, isAdded, curreny_type_State]);
  // useEffect(() => {}, [curreny_type_State, range]);

  const getProductByIdWrapper = async () => {
    const data = await getProductById(slug);
    if (data?.data?.imageList?.length) {
      let arr = data.data?.imageList.map((img) => ({
        original: img?.image,
        thumbnail: img?.image,
      }));
      setImages(arr);
    }
    // console.log(data);
    const favCheck = favourites.find((item) => item.id === data?.data?.id);
    favCheck ? setIsAdded(true) : setIsAdded(false);
    // console.log(favCheck);
    setDetail(data?.data);
    // console.log(curreny_type_State);
    // console.log(data.data);
    if (curreny_type_State === "CAD") {
      setRange(data?.data?.rangeCad);
    } else if (curreny_type_State === "EUR") {
      setRange(data?.data?.rangeEuro);
    } else {
      setRange(data?.data?.range);
    }
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
      price: price?.price,
      priceId: price?.priceId,
      attribute: attribute,
      quantity,
    };

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
      range: detail?.range,
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
      if (attrData && attrData.attributeImageFull?.length) {
        let imgArr = attrData.attributeImageFull.map((img) => ({
          original: img?.image,
          thumbnail: img?.image,
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
        console.log(data);
        if (data?.statusCode === 1) {
          let obj = {
            price: data?.data?.price,
            priceId: data?.data?.priceId,
          };
          setPrice(obj);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const showRating = () => {
    setIndexNumber(2);
  };
  const handleOnClick = () => {
    if (myRef.current) {
      myRef.current.test();
    }
  };
  const handleImageModal = () => {
    setShowImageModal(true);
  };
  return (
    <div className="mb-5 ">
      <Helmet>
        <title>{`Jackter.com: ${detail?.title}`}</title>
        <meta name="description" content={detail?.description} />
        <meta property="og:title" content={detail?.title} />
        <meta property="og:image" content={images[0]?.original} />
        <meta property="og:review" content={detail?.review} />
        <meta property="og:stars" content={detail?.reviewCount} />
        <meta property="og:category" content={detail?.categoryName} />
      </Helmet>
      <Breadcrumb>
        <BreadcrumbItem className="ml-5">
          <Link to="#">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={`/category/leather/${detail?.categoryId}`}>
            {detail?.categoryName}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          {detail?.title?.charAt(0)?.toUpperCase() + detail?.title?.slice(1)}
        </BreadcrumbItem>
      </Breadcrumb>
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
                showFullscreenButton={false}
                onClick={handleImageModal}
              />
            ) : (
              <SkeletonGallery />
            )}
          </div>
          <div className="col-md-6 marginTopAndBottom">
            {!detail ? (
              <Skeleton height={35} width={300} />
            ) : (
              <h1 className="product-title">{detail?.title}</h1>
            )}
            <p className="product-price mt-1">
              {!detail ? (
                <Skeleton height={35} width={300} />
              ) : (
                <h1 className="product-price mt-1">
                  {/* {curreny_type_State === "EUR" ? "???" : CURRENCY} {range} */}
                  {curreny_type_State === "EUR" ? "???" : CURRENCY}{" "}
                  {price && price.price ? price?.price : range}
                </h1>
              )}
            </p>
            {!detail ? (
              <Skeleton height={35} width={250} />
            ) : (
              <a
                className="d-flex align-items-center"
                onClick={handleOnClick}
                href="#tabs"
              >
                <ReactStars
                  classNames="rating"
                  count={5}
                  onChange={(ratingChanged) => console.log(ratingChanged)}
                  size={24}
                  isHalf={true}
                  edit={false}
                  value={detail?.review}
                />
                <span className="count-text">({detail?.reviewCount})</span>
              </a>
            )}
            <div className="mt-3">
              {/* <ul className="pl-3"> */}
             <h5>Product Specification</h5> 
              {!detail ? (
                <div className="d-flex flex-column">
                  <Skeleton height={20} width={250} />
                  <Skeleton height={20} width={250} />
                </div>
              ) : detail?.bulletList?.length ? (
                detail?.bulletList.map((list, i) => (
                  <span
                    key={i}
                    className="prod-desc"
                    dangerouslySetInnerHTML={{ __html: list?.point }}
                  ></span>
                ))
              ) : null}
              {/* </ul> */}
            </div>
            <FormGroup>
              {detail
                ? detail?.attributeList.map((attribute, index) => (
                    <div className="mt-3" key={index}>
                      <Label for="exampleSelect" className="attributes-heading">
                        {attribute?.parentTitle}
                        {":"}
                      </Label>
                      {/* {attribute?.parentTitle.toLowerCase() === "color" && */}
                      {attribute?.multi ? (
                        <div>
                          {attribute?.childAttributeList?.length
                            ? attribute?.childAttributeList.map((attr, ind) =>
                                attr?.attributeImageFull?.length
                                  ? attr?.attributeImageFull.map((attr_img, i) => {
                                      if (i === 0) {
                                        return (
                                          <span
                                            className="d-inline-block mr-3"
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
                                                "p-1 m-1 attribute-img rounded-circle" +
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
                                    })
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
                      ) : (
                        <Skeleton height={40} />
                      )}
                    </div>
                  ))
                : null}
            </FormGroup>
            <div className="d-flex justify-content-between align-items-center actoinButtons_wrapper_desc">
              {detail ? (
                <div className="d-flex justify-content-center align-items-center mr-1">
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
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  <Skeleton height={50} width={70} className="mx-1" />
                  <Skeleton height={50} width={70} className="mx-1" />
                  <Skeleton height={50} width={70} className="mx-1" />
                </div>
              )}
              <div className="d-flex justify-content-center align-items-center">
                {detail ? (
                  <button
                    className="btn actionButton_desc btn-info m-0 "
                    onClick={addtocart}
                    disabled={cart.some((e) => +e.id === +slug)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <Skeleton height={40} width={120} />
                )}
                {detail ? (
                  <button className="btn actionButton_desc ml-2  btn-buy m-0">
                    Buy Now
                  </button>
                ) : (
                  <Skeleton height={40} width={120} className="ml-1" />
                )}
              </div>
            </div>
            <div className="mt-3">
              {/* <p>SKU: ahoooo1</p> */}
              <div className="product-description-links">
                Category:{" "}
                {detail?.categoryId ? (
                  <Link
                    to={`/category/${detail?.categoryName
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")}/${detail?.categoryId}`}
                  >
                    <span>{detail?.categoryName}</span>
                  </Link>
                ) : (
                  <Skeleton width={100} height={15} />
                )}
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
        <section className="mt-5 mb-5" id="tabs">
          <DescriptionTabs
            detail={detail}
            indexNumber={indexNumber}
            ref={myRef}
            id={slug}
          />
        </section>
        <hr />
        <section className="mt-5 ">
          <h3>Related Items</h3>
          {products.length ? (
            products.length > 3 ? (
              <Slider {...settings}>
                {products.map((product, i) => (
                  <SliderCard pro={product} key={i} />
                ))}
              </Slider>
            ) : (
              <Row>
                <Col md={3}>
                  {products.map((product, i) => (
                    <SliderCard pro={product} key={i} />
                  ))}
                </Col>
              </Row>
            )
          ) : (
            <Slider {...settings}>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </Slider>
          )}
        </section>
      </div>

      {showImageModal && (
        <div className="mx-5 bg-danger">
          <ImageModal
            isOpen={showImageModal}
            images={images}
            title={detail?.title}
            detail={detail}
            handleCloseModal={setShowImageModal}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
