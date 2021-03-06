import { useState } from "react";
import { Button, Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

import CustomModal from "../CustomModal";
import { CURRENCY } from "../../constant";
import "./style.css";

const CardFour = (props) => {
  console.log("props", props);
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState([]);
  const curreny_type_State = useSelector(
    (state) => state.currencyReducer.currency_Value
  );
  return (
    <div className="row mt-2">
      {props?.products.map((pro, index) => {
        let slug = pro?.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return (
          <div className="col-md-3 col-6 p-1 mt-5" key={index}>
            <Card className="product-card">
              <div className="product-img-wrapper">
                <div className="product-img-wrapper1">
                  <Link to={`/product/${slug}/${pro?.id}`}>
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
                <span className="card-product-title" tag="h5">
                  <Link to={`/product/${slug}/${pro?.id}`}>{pro.title}</Link>
                </span>
                <div className="d-flex justify-content-center align-items-center">
                  <ReactStars
                    count={5}
                    onChange={(ratingChanged) => console.log(ratingChanged)}
                    size={24}
                    isHalf={true}
                    edit={false}
                    value={3}
                  />{" "}
                  (2)
                </div>
                <span tag="h6" className="mb-2 card-product-price">
                  {curreny_type_State === "EUR" ? "???" : CURRENCY}
                  {pro?.range}
                </span>
              </CardBody>
            </Card>
          </div>
        );
      })}
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
