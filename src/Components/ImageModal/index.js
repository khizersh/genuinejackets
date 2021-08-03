import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./style.css";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";
const index = ({ handleCloseModal, isOpen, images, title, detail }) => {
  const [currentImage, setCurrentImage] = useState(images?.[0].original);
  console.log(images);
  useEffect(() => {}, [currentImage]);
  return (
    <Modal
      isOpen={isOpen}
      toggle={handleCloseModal}
      centered={true}
      size="lg"
      // style={{ width: "100%" }}
      style={{ maxWidth: "900px", width: "100%", }}

    >
      <ModalBody>
        <div className="row h-100 pt-3 row_Image_modal_wrap">
          {/* left */}
          <div
            className="col-sm-8  h-100  text-center  "
            //   style={{ width: "60%" }}
          >
            <Magnifier
              style={{ height: "50%", width: "80%" }}
              imageSrc={currentImage}
              imageAlt={title && title}
            />
          </div>
          {/* right*/}
          <div className="col-sm-1" />
          <div className="text-right h-100  w-100    col-sm-3 rightWrapper_modal pr-5">
            <p
              className="cursor-pointer"
              onClick={() => handleCloseModal(false)}
            >
              X
            </p>
            <h4>{title}</h4>
            <div className="row">
              {images?.map((image) => (
                <div
                  onClick={() => setCurrentImage(image.original)}
                  className={`${
                    currentImage === image.original ? "active_modalBorder" : " "
                  } preview_box col-md-2 m-2`}
                >
                  <img
                    onClick={() => setCurrentImage(image.original)}
                    src={image?.thumbnail}
                    alt=""
                  />
                </div>
              ))}
              {images?.map((image) => (
                <div
                  onClick={() =>
                    setCurrentImage(
                      "https://m.media-amazon.com/images/I/81JqiQGWbFL._AC_SL1500_.jpg"
                    )
                  }
                  className={`${
                    currentImage ===
                    "https://m.media-amazon.com/images/I/81JqiQGWbFL._AC_SL1500_.jpg"
                      ? "active_modalBorder"
                      : ""
                  } preview_box col-md-2 m-2`}
                >
                  <img
                    src={
                      "https://m.media-amazon.com/images/I/81JqiQGWbFL._AC_SL1500_.jpg"
                    }
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>{" "}
      </ModalBody>
    </Modal>
  );
};

export default index;
