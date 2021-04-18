import { FormGroup, Input, Label } from "reactstrap";
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { getProductById } from "../../api/index";
import Footer from "../../Components/Footer";
import DescriptionTabs from "../../Components/DescriptionTabs";
import { CURRENCY } from "../../constant";
import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart } from "../../Store/actions/cart";
const images = [
  {
    original: "https://picsum.photos/id/1018/2000/2000/",
    thumbnail: "https://picsum.photos/id/1018/100/100/",
  },
  {
    original: "https://picsum.photos/id/1015/2000/2000/",
    thumbnail: "https://picsum.photos/id/1015/100/100/",
  },
  {
    original: "https://picsum.photos/id/1019/2000/2000/",
    thumbnail: "https://picsum.photos/id/1019/100/100/",
  },
  {
    original: "https://picsum.photos/id/1018/2000/2000/",
    thumbnail: "https://picsum.photos/id/1018/100/100/",
  },
  {
    original: "https://picsum.photos/id/1015/2000/2000/",
    thumbnail: "https://picsum.photos/id/1015/100/100/",
  },
  {
    original: "https://picsum.photos/id/1018/2000/2000/",
    thumbnail: "https://picsum.photos/id/1018/100/100/",
  },
  {
    original: "https://picsum.photos/id/1015/2000/2000/",
    thumbnail: "https://picsum.photos/id/1015/100/100/",
  },
  {
    original: "https://picsum.photos/id/1019/2000/2000/",
    thumbnail: "https://picsum.photos/id/1019/100/100/",
  },
  {
    original: "https://picsum.photos/id/1018/2000/2000/",
    thumbnail: "https://picsum.photos/id/1018/100/100/",
    originalClass: "hello",
  },
  {
    original: "https://picsum.photos/id/1015/2000/2000/",
    thumbnail: "https://picsum.photos/id/1015/100/100/",
  },
];
const ProductDescription = () => {
  const state = useSelector((state) => state.cartReducer.cartArray);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [detail, setDetail] = useState();
  useEffect(() => {
    getProductByIdWrapper();
  }, []);
  const getProductByIdWrapper = async () => {
    const data = await getProductById(slug);
    setDetail(data.data);
  };

  const addtocart = () => {
    let cartItemObj = {
      id: detail.id,
      itemName: detail?.title,
      itemImage: detail.imageList[0].picByte,
      attribute: {
        color,
        size,
      },
      quantity,
    };

    dispatch(add_to_cart(cartItemObj));
  };
  return (
    <div className="my-5">
      <div className="container">
        <div className="row w-100 ">
          <div className="col-md-6   d-flex justify-content-center align-items-center">
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
          </div>
          <div className="col-md-6 marginTopAndBottom">
            <p className="product-title">{detail?.title}</p>
            <p className="product-price mt-1">
              {CURRENCY}70.00 - {CURRENCY}80.00
            </p>
            <p className="product-description mt-1">{detail?.description}</p>
            <FormGroup>
              <Label for="exampleSelect" className="attributes-heading">
                Color
              </Label>
              <Input
                className="select-menu"
                type="select"
                name="Color"
                id="exampleSelect"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option className="custom-option-description" disabled>
                  Choose an Optioan
                </option>
                {detail &&
                  detail?.attributeList
                    .filter((attr) => attr?.parentTitle === "Color")
                    .map((attribute, index) => (
                      <option className="custom-option-description" key={index}>
                        {attribute?.childAttributeList[0]?.title}
                      </option>
                    ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="size" className="attributes-heading">
                SIZE
              </Label>
              <Input
                className="select-menu"
                type="select"
                name="size"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option className="custom-option-description" disabled>
                  Choose an Option
                </option>
                {detail &&
                  detail?.attributeList
                    .filter((attr) => attr.parentTitle === "Size")
                    .map((attribute) =>
                      attribute.childAttributeList.map(
                        (nestedAttribute, index) => (
                          <option
                            className="custom-option-description"
                            key={index}
                          >
                            {nestedAttribute?.title}
                          </option>
                        )
                      )
                    )}
              </Input>
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
                  disabled={state.some((e) => e.id === slug)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div>
              <button className="btn btn-dark btn-lg mt-3">Buy Now</button>
            </div>
            <div className="mt-3">
              {/* <p>SKU: ahoooo1</p> */}
              <div className="product-description-links">
                Categories: <span>{detail?.categoryName}</span>
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