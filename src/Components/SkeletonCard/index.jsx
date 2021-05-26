import React from "react";
import Skeleton from "react-loading-skeleton";
import "./index.css";
const index = () => {
  return (
    <div className="skeletonProductWrapper" >
      <Skeleton height={350} className="skeleton_Image" />
      <div className="flex flex-column justify-content-center sub_skeleton_wrapper">
        <Skeleton height={20} className="sub_skeleton" />
        <Skeleton height={20} className="sub_skeleton" />
        <Skeleton height={20} className="sub_skeleton" />
      </div>
    </div>
  );
};

export default index;
