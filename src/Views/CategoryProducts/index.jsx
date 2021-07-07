import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import "./index.css";
import SkeletonCard from "../../Components/SkeletonCard";
import { getProductsByCategory } from "../../api/index";
import GlobalCard from "../../Components/GlobalCard/index";

const Index = () => {
  const { slug } = useParams();
  const [range1, setRange1] = useState(null);
  const [range2, setRange2] = useState(0);
  const [volume, setVolume] = useState([0, 0]);
  const [products, setProducts] = useState([]);
  const [priceFilterProducts, setPriceFilterProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, [slug, volume]);
  const getProducts = async () => {
    try {
      const { data } = await getProductsByCategory(slug);
      setProducts(data);
      const validProducts = data.filter((product) => product.range);
      setProducts(validProducts);
      setPriceFilterProducts(validProducts);
      // console.log(validProducts);
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    console.log("After Change", priceFilterProducts, range1);
    priceFilterProducts?.map((element) => {
      console.log("value 1", parseInt(element.range.split("-")[0].trim()));
      console.log("value 2", parseInt(element.range.split("-")[1].trim()));
      if (parseInt(element.range.split("-")[0].trim()) >= range1) {
        console.log("min", parseInt(element.range.split("-")[0].trim()));
        setRange1(parseInt(element.range.split("-")[0].trim()));
        console.log("Min State===>", range1);
      }
      if (parseInt(element.range.split("-")[1].trim()) >= range2) {
        setRange2(parseInt(element.range.split("-")[1].trim()));
        console.log("max", parseInt(element.range.split("-")[1].trim()));
        console.log("Max State===>", range2);
      }
    });
    // setRange1(1000);
    // setRange2(5000);
  }, [volume, priceFilterProducts]);

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
    <div className="mt-4">
      <div onClick={() => console.log(range1, range2)}>
        <img
          src="https://codetheweb.blog/assets/img/posts/css-advanced-background-images/cover.jpg"
          alt="background cover"
          width="100%"
          height="500px"
        />
      </div>
      <Breadcrumb>
        <BreadcrumbItem className="ml-5">
          <Link to="#">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Category</BreadcrumbItem>
      </Breadcrumb>
      <section className="mt-5">
        <div className="container ">
          <div className="row">
            <div className="col-md-3">
              <div className="mt-5 pt-5">
                <h2> By Price</h2>
                {range1 && range2 && (
                  <Range
                    draggableTrack
                    min={range1}
                    step={10}
                    max={range2}
                    value={[range1,range2]}
                    onChange={setVolume}
                    onAfterChange={afterHandleChange}
                  />
                )}
                <p className="text-muted mt-3">
                  Price: Rs {range1} - Rs {range2}
                </p>
              </div>
            </div>
            <div className="col-md-9 ">
              <div className="row p-0 m-0 ">
                {!products.length ? (
                  <div className="row p-0 w-full ">
                    <div className="col-xl-3  center col-md-4 col-sm-6 col-12 mt-2 p-0 ">
                      <SkeletonCard />
                    </div>
                    <div className=" col-xl-3 center col-md-4 col-sm-6 col-12 mt-2 p-0 ">
                      <SkeletonCard />
                    </div>
                    <div className=" col-xl-3 center col-md-4 col-sm-6 col-12 mt-2 p-0 ">
                      <SkeletonCard />
                    </div>
                    <div className=" col-xl-3 center col-md-4 col-sm-6 col-12 mt-2 p-0 ">
                      <SkeletonCard />
                    </div>
                  </div>
                ) : (
                  priceFilterProducts.map((item, index) => (
                    <div
                      className="col-xl-3 col-md-4 col-sm-6 col-12 m-0 p-0 "
                      key={index}
                    >
                      <GlobalCard pro={item} className="w-100" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
