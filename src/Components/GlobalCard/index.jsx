import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

import CustomModal from "../CustomModal";
import { CURRENCY } from "../../constant";
import "./globalCard.css";

function GlobalCard({ pro }) {
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState([]);
  const [slug, setSlug] = useState("");
  const curreny_type_State = useSelector(
    (state) => state.currencyReducer.currency_Value
  );
  useEffect(() => {
    setDetail(pro);
    let _slug = pro?.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setSlug(_slug);
  });
  return (
    <div className=" pb-5 p-1 pt-0 mt-5 product-card-global_wrapper scaleY">
      <Card className="product-card-global ">
        <div className="product-img-wrapper">
          <div className="product-img-wrapper">
            <Link to={`/product/${slug}/${pro?.id}`}>
              <CardImg
                top
                width="100%"
                height="300px"
                className="card_img_wrapper"
                src={`${pro?.imageList[0]?.image}`}
                alt="Card image cap"
              />
            </Link>
          </div>
          <div className="product-btn-wrapper">
            <Button
              className="add-to-cart-btn btn-block btn-sm"
              onClick={() => {
                setDetail(pro);
                setShowModal(!showModal);
              }}
            >
              Quick View
            </Button>
          </div>
        </div>
        <CardBody className="text-center pt-0">
          <span className="card-product-title" tag="h5">
            <Link to={`/product/${slug}/${pro?.id}`}>
              {pro?.title?.length < 37
                ? pro?.title
                : pro.title.slice(0, 32) + "..."}
            </Link>
          </span>
          <div className="d-flex justify-content-center align-items-center">
            <ReactStars
              className="product_card_global_stars"
              count={5}
              onChange={(ratingChanged) => console.log(ratingChanged)}
              size={24}
              isHalf={true}
              edit={true}
              value={detail?.review}
              style={{ fontSize: "5px" }}
            />{" "}
            ({detail?.reviewCount})
          </div>
          <span tag="h6" className="mb-2 card-product-price ">
            {curreny_type_State === "EUR" ? "???" : CURRENCY}
            {pro?.range}
          </span>
        </CardBody>
      </Card>
      {showModal && (
        <CustomModal
          detail={detail}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default GlobalCard;
