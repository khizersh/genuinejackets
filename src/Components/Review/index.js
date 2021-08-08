import React from "react";
import ReactStars from "react-rating-stars-component";

const index = ({ userImage, userName, reviewCount, review }) => {
  return (
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
  );
};

export default index;
