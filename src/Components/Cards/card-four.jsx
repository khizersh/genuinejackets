import { useState } from "react";
import { Button, Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import CustomModal from "../CustomModal";
import { CURRENCY } from "../../constant";
import "./style.css";

const CardFour = (props) => {
  console.log("props", props);
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState([]);
  return (
    <div className="row mt-2">
      {props?.products.map((pro, index) => (
        <div className="col-md-3 col-6 p-1 mt-5" key={index}>
          <Card className="product-card">
            <div className="product-img-wrapper">
              <div className="product-img-wrapper1">
                <Link to={`/product/${pro?.id}`}>
                  <CardImg
                    top
                    width="100%"
                    height="350px"
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
            <CardBody className="text-center">
              <div className="d-flex justify-content-center align-items-center">
                <ReactStars
                  count={5}
                  onChange={(ratingChanged) => console.log(ratingChanged)}
                  size={24}
                  isHalf={true}
                  edit={false}
                  value={3}
                />{" "}(2)
              </div>
              <span className="card-product-title" tag="h5">
                <Link to={`/product/${pro?.id}`}>{pro.title}</Link>
              </span>
              <br />
              <span tag="h6" className="mb-2 card-product-price">
                {CURRENCY}
                {pro?.range}
              </span>
            </CardBody>
          </Card>
        </div>
      ))}
      {showModal && (
        <CustomModal
          detail={detail}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default CardFour;
