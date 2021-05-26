import React, { Fragment, useEffect, useState } from "react";

import SliderComponent from "../../Components/Slider";
import SkeletonCard from "../../Components/SkeletonCard";

import { getSectionProducts, getMainBanner } from "../../api/index";
import "./style.css";
import Slider from "react-slick";
import SliderCard from "../../Components/Cards/SliderCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  const [banners, setBanners] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  useEffect(() => {
    getAllProductsWrapper();
    getBanner();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const getAllProductsWrapper = async () => {
    try {
      const { data } = await getSectionProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBanner = async () => {
    try {
      const data = await getMainBanner();
      setBanners(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      <SliderComponent slides={banners} />

      <div className="container">
        {products.length
          ? products.map((pro, ind) => (
              <span className={ind} key={ind}>
                <h1 className="text-center font-weight-bold mt-5">
                  {pro.title}
                </h1>
                <Slider {...settings}>
                  {pro?.productList?.map
                    ? pro.productList
                        .filter((product) => product.range)
                        .map((product, i) => (
                          <div key={i}>
                            <SliderCard pro={product} />
                          </div>
                        ))
                    : null}
                </Slider>
              </span>
            ))
           : (
            <Slider {...settings}>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </Slider>
          )}
      </div>
    </div>
  );
};

export default Home;
