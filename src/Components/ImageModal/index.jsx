import React, { useState, useEffect } from "react";
import { Modal, ModalBody } from "reactstrap";

import "./style.css";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";
import { AiOutlineClose } from "react-icons/ai";

const ImageModal = ({ handleCloseModal, isOpen, images, title, detail }) => {
  const [currentImage, setCurrentImage] = useState(images[0]?.original);
  console.log(images);
  useEffect(() => {}, [currentImage]);
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => handleCloseModal(false)}
      centered={true}
      size="lg"
      // style={{ width: "100%" }}
      style={{ maxWidth: "900px", width: "100%" }}
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
          {/* <div className="col-sm-1" /> */}
          <div className="text-right h-100 col-sm-4 rightWrapper_modal pr-5">
            <p
              className="cursor-pointer"
              onClick={() => handleCloseModal(false)}
            >
              <AiOutlineClose size="22" />
            </p>
            <h4>{title}</h4>
            <div className="row">
              {images?.map((image) => (
                <div
                  onClick={() => setCurrentImage(image.original)}
                  className={`${
                    currentImage === image.original ? "active_modalBorder" : " "
                  } preview_box col-md-3 m-1`}
                >
                  {/* <div> */}
                  <img
                    onClick={() => setCurrentImage(image.original)}
                    src={image?.thumbnail}
                    alt=""
                  />
                  {/* </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>{" "}
      </ModalBody>
    </Modal>
  );
};

export default ImageModal;
