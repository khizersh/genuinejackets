import React, { useEffect, useState } from "react";

import SliderComponent from "../../Components/Slider";
import CardFour from "../../Components/Cards/card-four";
import Footer from "../../Components/Footer";
import { getSectionProducts, getMainBanner } from "../../api/index";
import "./style.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  useEffect(() => {
    getAllProductsWrapper();
    getBanner();
  }, []);
  const getAllProductsWrapper = async () => {
    try {
      const { data } = await getSectionProducts();

      console.log(data[0]);
      setSectionTitle(data[0].title);
      setProducts(data[0].productList);
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
        <CardFour products={products} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
