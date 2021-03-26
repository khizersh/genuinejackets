import { Button, Card, CardBody, CardImg } from "reactstrap";
import "./style.css";
import { Link } from "react-router-dom";

const CardFour = (props) => {
  return (
    <div className="row mt-2">
      {props?.products?.length &&
        props?.products.map((pro, index) => (
          <div className="col-md-3 col-6 p-1 mt-5">
            <Card className="product-card">
              <div className="product-img-wrapper">
                <div className="product-img-wrapper1">
                  <Link to={`/product/${pro?.id}`}>
                    <CardImg
                      top
                      width="100%"
                      src={pro?.image}
                      alt="Card image cap"
                    />
                  </Link>
                </div>
                <div className="product-btn-wrapper">
                  <Button className="add-to-cart-btn btn-block btn-sm">
                    Quick View
                  </Button>
                </div>
              </div>
              <CardBody className="text-center">
                <span className="product-title" tag="h5">
                  <Link to={`/product/${pro?.id}`}>{pro?.title}</Link>
                </span>
                <br />
                <span tag="h6" className="mb-2 product-price">
                  Rs.{pro?.price}
                </span>
              </CardBody>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default CardFour;
