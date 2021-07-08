import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { searchProduct } from "../../api/index";
import SliderCard from "../../Components/Cards/SliderCard";
import Loader from "../../Components/Loader";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data, statusCode } = await searchProduct(
          search.slice(1, search.length)
        );
        if (statusCode === 1) {
          setProducts(data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, [search]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2>SEARCH RESULTS for "{search?.slice(1, search?.length)}"</h2>
        <p>{products.length} ITEMS</p>
      </div>
      <div className="row">
        {products?.length
          ? products
              .filter((product) => product.priceRange)
              .map((product, ind) => (
                <div className="col-md-3" key={ind}>
                  <SliderCard pro={product} />
                </div>
              ))
          : null}
      </div>
    </div>
  );
};

export default Search;
