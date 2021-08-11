import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardTitle } from "reactstrap";
import "./style.css";

const CategoryCard = ({ title, img, link, isLeftAlign }) => {
  return (
    <Link to={link}>
      <div>
        <div className="category-lg-card">
          <img className="cat-img" src={img} alt={title} width={400} />
          <div
            className={
              isLeftAlign ? "position-absolute-left" : "position-absolute"
            }
          >
            <h2 className="font-weight-bold">{title}</h2>
            View Category
          </div>
        </div>
        <Card className="category-md-card">
          <CardImg top width="100%" src={img} alt={title} />
          <CardBody>
            <CardTitle tag="h5">{title}</CardTitle>
          </CardBody>
        </Card>
      </div>
    </Link>
  );
};

export default CategoryCard;
