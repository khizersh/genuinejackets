import React from "react";
import ReactStars from "react-rating-stars-component";

const index = ({ userImage, userName, reviewCount, review, reviewImage }) => {
  return (
    <>
      <div className="row">
        <div className="col-8">
          <div className="d-flex align-items-center my-3 ">
            <img
              className="mr-3"
              style={{ height: "60px", width: "60px", borderRadius: "100%" }}
              src={userImage}
              alt="userProfile"
            />
            <div className="d-flex justify-content-center flex-column">
              <strong className="mb-0">{userName}</strong>
              <ReactStars
                classNames="rating"
                count={5}
                size={24}
                isHalf={true}
                edit={false}
                value={reviewCount}
              />
              <p>{review}</p>
            </div>
          </div>
        </div>
        {reviewImage ? (
          <div className="col-4 m-auto">
            <div className="float-right">
              <img src={reviewImage} alt={review} width="150" height="100%" />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default index;
