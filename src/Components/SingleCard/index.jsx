import { useState } from "react";
import { Button, Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

import CustomModal from "../CustomModal";
import { CURRENCY } from "../../constant";
import "./style.css";
const SingleCard = ({ pro }) => {
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState([]);
  return (
    <div>
      <Card className="product-card">
        <div className="product-img-wrapper">
          <div className="product-img-wrapper1">
            <Link to={`/product/${pro?.id}`}>
              <CardImg
                top
                width="100"
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
        <CardBody className="text-center" height="single_Card_body">
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

export default SingleCard;
