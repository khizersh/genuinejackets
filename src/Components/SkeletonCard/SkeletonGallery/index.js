import React from "react";
import Skeleton from "react-loading-skeleton";
import "./skeletonGallery.css";
function index() {
  return (
    <div className="row m-0 p-0 no-gutters skeleton_gallery_wrapper">
      <div className="col-sm-4 d-flex flex-column m-0 p-0 skeleton_Thumbnail_wrapper">
        <Skeleton width={120} height={100} className=" sketon_Thumbnail" />
        <Skeleton width={120} height={100} className="sketon_Thumbnail" />
        <Skeleton width={120} height={100} className="sketon_Thumbnail" />
        <Skeleton width={120} height={100} className="sketon_Thumbnail" />
      </div>
      <div className="col-md-8 col-sm-12 m-0 p-0">
        <Skeleton height={400} width={300} className="sketon_Image_Gallery" />
      </div>
    </div>
  );
}

export default index;
