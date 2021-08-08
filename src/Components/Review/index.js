import React from "react";
import ReactStars from "react-rating-stars-component";

const index = () => {
  return (
    <div className="d-flex align-items-center my-3 ">
      <img
        className="mr-3"
        style={{ height: "60px", width: "60px", borderRadius: "100%" }}
        src="https://images.everydayhealth.com/images/diet-nutrition/how-many-calories-are-in-a-banana-1440x810.jpg?sfvrsn=be4504bc_0"
        alt="userProfile"
      />
      <div className="d-flex justify-content-center flex-column">
        <strong className="mb-0">Hamza</strong>
        <ReactStars
          classNames="rating"
          count={5}
          size={24}
          isHalf={true} 
          edit={false}
          value={3}
        />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. In,
          incidunt!
        </p>
      </div>
    </div>
  );
};

export default index;
