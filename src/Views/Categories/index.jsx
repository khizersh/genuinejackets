import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import { getChildCategories, getParentCategoriesWithChild } from "../../api";
import CategoryCard from "../../Components/Cards/category-card";

import "./style.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      try {
        let data = await getChildCategories(id);
        let parentCat = await getParentCategoriesWithChild();
        setCategories(data?.data);
        setParentCategories(parentCat?.data);
      } catch (error) {
        return error.message;
      }
    };
    getData();
  }, []);

  const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  };
  const [width, height] = useWindowSize();
  return (
    <div className={`${width > 1199 ? "container" : "container-fluid px-5"} mt-5`}>
      <Row>
        <Col sm={0} md={3} className="p-0 filter">
          {parentCategories?.length
            ? parentCategories.map((cat, ind) => {
                // let title = cat?.childTitle
                //   ?.toLowerCase()
                //   .replace(/[^a-z0-9]+/g, "-");
                return (
                  <section key={ind}>
                    <h5>{cat?.title}:</h5>
                    <ul className="categories-list">
                      {cat?.childList?.length
                        ? cat?.childList?.map((child_cat, index) => (
                            <li key={index}>
                              <Link
                                to={`/category/${child_cat?.childTitle
                                  ?.toLowerCase()
                                  .replace(/[^a-z0-9]+/g, "-")}/${
                                  child_cat?.id
                                }`}
                              >
                                {child_cat?.childTitle}
                              </Link>
                            </li>
                          ))
                        : null}
                    </ul>
                  </section>
                );
              })
            : null}
        </Col>
        <Col md={9}>
          <Row className="card-wrapper">
            {categories?.length
              ? categories.map((cat, ind) => {
                  let title = cat?.categoryName
                    ?.toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-");
                  return (
                    <Col
                      xs={6}
                      sm={6}
                      md={6}
                      className={
                        ind % 2 === 0 ? "left-wrapper" : "right-wrapper"
                      }
                    >
                      <CategoryCard
                        title={cat?.categoryName}
                        link={`/category/${title}/${cat?.id}`}
                        isLeftAlign={ind % 2 === 0 ? false : true}
                        img={cat?.image}
                      />
                    </Col>
                  );
                })
              : null}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Categories;
