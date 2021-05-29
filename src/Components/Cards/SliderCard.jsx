import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import CustomModal from "../CustomModal";
import { CURRENCY } from "../../constant";
import "./style.css";

function SliderCard({ pro }) {
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState("");
  const [slug, setSlug] = useState("");
  useEffect(() => {
    setDetail(pro);
    let _slug = pro?.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setSlug(_slug);
  });
  return (
    <div className=" pb-5 p-1 mt-5 scaleY  ">
      <Card className="product-card-Wrapper">
        <div className="product-img-wrapper">
          <div className="product-img-wrapper1">
            <Link to={`/product/${slug}/${pro?.id}`}>
              <CardImg
                top
                width="100%"
                height="300px"
                className="card_img_wrapper"
                src={`${pro.imageList[0].image}`}
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
        <CardBody className="text-center">
          <div className="d-flex justify-content-center align-items-center">
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
          <span className="card-product-title" tag="h5">
            <Link to={`/product/${slug}/${pro?.id}`}>{pro.title}</Link>
          </span>
          <br />
          <span tag="h6" className="mb-2 card-product-price pb-5">
            {CURRENCY}
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

export default SliderCard;