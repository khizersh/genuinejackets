import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Table } from "reactstrap";
import "react-tabs/style/react-tabs.css";
import Skeleton from "react-loading-skeleton";
import { getReviews, postReview } from "../../api/index";
import Review from "../Review";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
const Index = forwardRef(({ detail, id, indexNumber }, ref) => {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [file, setFile] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = useSelector((state) => state.authReducer);

  const test = () => {
    setTabIndex(1);
  };
  const ratingChanged = (newRating) => {
    // alert(newRating);
    setRating(newRating);
  };

  useImperativeHandle(ref, () => ({
    test() {
      setTabIndex(1);
    },
  }));

  useEffect(() => {
    getPrductReviews();
  }, []);

  useEffect(() => {
    getPrductReviews();
  }, [rating]);

  const getPrductReviews = async () => {
    try {
      const allReviews = await getReviews(id);
      setReviews(allReviews?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePostReview = async () => {
    try {
      const body = {
        review,
        userId: user?.id,
        reviewCount: rating,
        productId: id,
      };
      let form = new FormData();
      form.append("reviewString", JSON.stringify(body));
      form.append("file", file);
      const response = await postReview(form);
      console.log(response);
      if (response?.data?.statusCode === 1) {
        toast.success("Successfully Rated");
        getPrductReviews();
        setReview("");
        setRating(0);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onClickImage = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div>
      <Tabs selectedIndex={tabIndex}>
        <TabList>
          <Tab onClick={() => setTabIndex(0)}>DESCRIPTION</Tab>
          <Tab onClick={() => setTabIndex(1)}>
            REVIEWS ({detail?.reviewCount})
          </Tab>
          <Tab onClick={() => setTabIndex(2)}>Return & Refund</Tab>
          <Tab onClick={() => setTabIndex(3)}>Shipping Details </Tab>
        </TabList>

        <TabPanel className="mt-5">
          <h2 className="pb-4 product-description-tab">Description</h2>
          {!detail?.description ? (
            <Skeleton className="description_Skeleton" height={100} />
          ) : (
            <p dangerouslySetInnerHTML={{ __html: detail?.description }}></p>
          )}
        </TabPanel>

        <TabPanel>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12">
                <h2 className="pb-4 product-description-tab">Reviews</h2>
                {!reviews?.length ? (
                  <span>
                    <p>There are no reviews yet.</p>
                    <p style={{ letterSpacing: "2px" }}>
                      Be the first to review
                      {/* “Minty Dress */}
                    </p>
                  </span>
                ) : (
                  reviews.map((rev, ind) => (
                    <Review
                      userImage={rev?.userImage}
                      userName={rev?.userName}
                      reviewCount={rev?.reviewCount}
                      review={rev?.review}
                      reviewImage={rev?.reviewImage}
                      key={ind}
                    />
                  ))
                )}
              </div>
              <div className="col-lg-6 col-12">
                {!user ? (
                  <p>
                    You must be{" "}
                    <span style={{ color: "#337ab7" }}>logged in</span> to post
                    a review
                  </p>
                ) : (
                  <div>
                    <h2 className="text-muted">Write a review</h2>
                    <ReactStars
                      classNames="rating"
                      onChange={ratingChanged}
                      count={5}
                      size={24}
                      isHalf={true}
                      edit={true}
                      value={rating}
                    />
                    <textarea
                      name="review"
                      onChange={(e) => setReview(e.target.value)}
                      className="mt-3 rounded-lg p-3 w-100 "
                      style={{ backgroundColor: "#e4e4e4", fontSize: "20px" }}
                      rows="5"
                    ></textarea>
                    <div className="form-group">
                      <label>Attach image</label>
                      <input type="file" className="" onChange={onClickImage} />
                    </div>
                    <button
                      className="btn btn-success d-block"
                      onClick={handlePostReview}
                    >
                      Post Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
        <h2 className="pb-4 product-description-tab">Shipping & Refund</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            quas ipsam earum fuga deserunt aliquid iste ducimus libero, eum
            molestias sapiente modi vel natus, omnis in. Velit vitae ipsa magnam
            illo. Debitis, ut culpa! Quisquam molestiae unde fuga? Molestiae
            atque illum earum ipsa praesentium qui aut est dolorum recusandae
            harum.
          </p>
        </TabPanel>
        <TabPanel>
          <h2 className="pb-4 product-description-tab">Shipping Details</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            quas ipsam earum fuga deserunt aliquid iste ducimus libero, eum
            molestias sapiente modi vel natus, omnis in. Velit vitae ipsa magnam
            illo. Debitis, ut culpa! Quisquam molestiae unde fuga? Molestiae
            atque illum earum ipsa praesentium qui aut est dolorum recusandae
            harum.
          </p>
        </TabPanel>
      </Tabs>
    </div>
  );
});

export default Index;
