import React, { useEffect, useState } from "react";

import SliderComponent from "../../Components/Slider";

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
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
    ],
  };
  const getAllProductsWrapper = async () => {
    try {
      const { data } = await getSectionProducts();
      setSectionTitle(data[0].title);
      const validProducts = data[0]?.productList.filter(
        (product) => product.range
      );
      console.log(validProducts);
      setProducts(validProducts);
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
        <h1 className="text-center font-weight-bold mt-5">
          {sectionTitle && sectionTitle}
        </h1>
        {/* <CardFour products={products} /> */}
        <Slider {...settings}>
          {products.map((product) => (
            <div>
              <SliderCard pro={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
