import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Range } from "rc-slider";
import SingleCard from "../../Components/SingleCard";
import Footer from "../../Components/Footer";
import { getProductsByCategory } from "../../api/index";
import "rc-slider/assets/index.css";
const Index = () => {
  const { slug } = useParams();
  const [volume, setVolume] = useState([50, 200]);
  const [products, setProducts] = useState([]);
  const [priceFilterProducts, setPriceFilterProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, [slug]);
  const getProducts = async () => {
    try {
      const data = await getProductsByCategory(slug);
      setProducts(data.data);
      setPriceFilterProducts(data.data);
    } catch (error) {
      return error.message;
    }
  };

  const afterHandleChange = () => {
    let productClone = [...products];
    let filteredArray = [];
    for (let index = 0; index < productClone.length; index++) {
      let element = productClone[index];
      if (element.range) {
        if (
          parseInt(element.range.split("-")[0].trim()) >= volume[0] &&
          parseInt(element.range.split("-")[1].trim()) <= volume[1]
        ) {
          filteredArray.push(element);
        }
      } else {
        filteredArray.push(element);
      }
    }
    setPriceFilterProducts(filteredArray);
  };
  return (
    <div className="mt-5">
      <div className="container">
        <img
          src="https://codetheweb.blog/assets/img/posts/css-advanced-background-images/cover.jpg"
          alt="background cover"
          width="100%"
          height="500px"
        />
      </div>

      <section className="mt-5">
        <div className="container">
          {products.length ? (
            <div className="row">
              <div className="col-md-3">
                <div className="mt-5 pt-5">
                  <h2> By Price</h2>
                  <Range
                    draggableTrack
                    min={50}
                    step={10}
                    max={200}
                    value={volume}
                    onChange={setVolume}
                    onAfterChange={afterHandleChange}
                  />
                  <p className="text-muted mt-3">
                    Price: Rs {volume[0]} - Rs {volume[1]}
                  </p>
                </div>
              </div>
              <div className="col-md-9">
                <div className="row">
                  {priceFilterProducts.map((item, index) => (
                    <div className="col-md-4 my-1" key={index}>
                      <SingleCard pro={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-center">No Products Available</h1>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
