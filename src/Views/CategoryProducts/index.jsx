import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Range } from "rc-slider";

import SingleCard from "../../Components/SingleCard";
import { getProductsByCategory } from "../../api/index";
import "rc-slider/assets/index.css";
const Index = () => {
  const { slug } = useParams();
  const [range1, setRange1] = useState(150);
  const [range2, setRange2] = useState(1000);
  const [volume, setVolume] = useState([150, 1000]);
  const [products, setProducts] = useState([]);
  const [priceFilterProducts, setPriceFilterProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, [slug,volume]);
  const getProducts = async () => {
    try {
      const { data } = await getProductsByCategory(slug);
      setProducts(data);
      const validProducts = data.filter((product) => product.range);
      setProducts(validProducts);
      setPriceFilterProducts(validProducts);
      console.log(validProducts);
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    console.log("After Change");
    priceFilterProducts?.map((element) => {
      console.log("value 1", parseInt(element.range.split("-")[0].trim()));
      console.log("value 2", parseInt(element.range.split("-")[1].trim()));
      if (parseInt(element.range.split("-")[0].trim()) >= range1) {
        console.log("min", parseInt(element.range.split("-")[0].trim()));
        setRange1(500);
        console.log("Min State===>", range1);
      }
      if (parseInt(element.range.split("-")[1].trim()) >= range2) {
        setRange2(8000);
        console.log("max", parseInt(element.range.split("-")[1].trim()));
        console.log("Max State===>", range2);

      }
    });
    setRange1(1000);
    setRange2(5000);
  }, [volume]);

  const afterHandleChange = () => {
    console.log("change");
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
      <div onClick={()=>console.log(range1,range2)}>
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
                    min={range1}
                    step={10}
                    max={range2}
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
    </div>
  );
};

export default Index;
