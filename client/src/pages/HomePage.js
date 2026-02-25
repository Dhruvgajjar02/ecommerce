import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
// import { BiFontSize } from "react-icons/bi";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/1`);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // initial load
  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

  // load more when page changes
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setProducts((prev) => [...prev, ...data?.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // when filters cleared
  useEffect(() => {
    if (!checked.length && !radio.length) {
      setPage(1);
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line no-use-before-define
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout title={"Clickmart "}>
      <div className="container-fluid m-3 p-3">
        <div className="row mt-3 p-4">
          <div className="col-md-3">
            {/* categories filter */}
            <h4 className="text-center">Filter By Category</h4>
            <div className="checkbox">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="checkbox ">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column ">
              <button
                className="btn btn"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-9">
            {/* <h1 className="text-center">All Products</h1> */}
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card"
                    alt={p.name}
                  />

                  <div className="card-body">
                    <h5 className="card-title">
                      <b onClick={() => navigate(`product/${p.slug}`)}>
                        {p.name}
                      </b>
                    </h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text"> $ {p.price}</p>
                    <div className="cartbtn">
                      <button
                        class="btn btn ms-1"
                        onClick={() => navigate(`product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        class="btn btn ms-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to Cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-4 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
