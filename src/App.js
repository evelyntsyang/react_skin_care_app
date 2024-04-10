import logo from "./logo.svg";
import "./App.css";
import SkincareProduct from "./SkincareProduct";
import Cart from "./Cart";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import skincareImage from "./assets/img/skincare.jpg";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [skincareProducts, setSkinCareProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [total, setTotal] = useState(0);

  const baseUrl = "https://nodesj-skincare-app-backend.onrender.com"
  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);

    let arry = [...cartItems, product];
    const totalPrice = arry.reduce((acc, product) => acc + product.price, 0);
    setTotal(totalPrice);

    console.log(totalPrice); 
  };

  
  
  useEffect(() => {
    fetch(`${baseUrl}/skincare`)
      .then((response) => response.json())
      .then((data) => {
        setSkinCareProducts(data);
      });
  }, []);

  useEffect(() => {
    // Calculate total price whenever cartItems changes
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  

  const handleSearchSubmit = () => {

    fetch(`${baseUrl}/skinCare?keyword=${searchKeyword}`)
    .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSkinCareProducts(data)
      });

  };

  const handleSearch = () => {
    
    fetch(`${baseUrl}/skincare/search?keyword=${searchKeyword}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      });
  };


  return (
    <div>
      <div className="landing-page mt-2">
        <Navbar bg="black" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Pure Skin Co.</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#home">Home</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div style={{ padding: "40px" }}>
          <Row className="justify-content-center align-items-center p-4 ">
            <Col md={5} className="text-center m-4">
              <h1 style={{ fontSize: "2.5rem" }}>Welcome to PURE SKIN CO. </h1>
              <p className="lead">
                Manage your daily skincare routine with purity and care.
              </p>
            </Col>

            <Col md={5} className="text-center">
            <img
                src={skincareImage}
                alt="Skincare Collection"
                style={{ maxWidth: "70%" }}
              />
            </Col>
          </Row>
          <Row>
          <div style={{ margin: '0 auto', maxWidth: '1000px' }}>
            <h3 className="lead"  >
                <strong>Introducing Our Pure Skincare Collection</strong>{" "}
              </h3>
              <p className="lead">
                At <strong>Pure Skin Co</strong>, purity is our promise. We
                meticulously craft each formulation with the finest natural
                ingredients, sourced from around the globe. We believe in
                harnessing the power of nature to unlock radiant, rejuvenated
                skin without compromise.
              </p>
              <p className="lead">
                For those seeking high value without sacrificing quality, our
                high CP (cost-performance) line delivers exceptional efficacy at
                an accessible price point. Designed to make luxury skincare
                accessible to all, these products combine affordability with
                uncompromising performance, ensuring that superior skincare is
                within reach for everyone.
              </p>
              <p className="lead">
                Whether you opt for high-end luxury or high CP practicality,
                rest assured that each product in our collection is
                meticulouslyw formulated to deliver visible results. From
                diminishing fine lines and wrinkles to restoring youthful
                luminosity, our skincare solutions are designed to address your
                unique concerns effectively.
              </p>
              <p className="lead">
                Join us on a journey to radiant, healthy skin with{" "}
                <strong>Pure Skin Co.</strong>. Experience the perfect fusion of
                pure, natural ingredients and unparalleled efficacy, and
                discover the transformative power of skincare done right.
              </p>
            </div>

          </Row>

          <div style={{ marginBottom: '100px' }} />

          <Row className="mt-3" style={{ margin: '0 auto', maxWidth: '1000px' }} >
            <Col md={9}>
              <Form>
                <Form.Group controlId="searchKeyword">
                  <Form.Control
                    type="text"
                    placeholder="Enter keyword"
                    value={searchKeyword}
                    onChange={ e =>  setSearchKeyword(e.target.value) }
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col md={1}>
              <Button variant="dark" onClick={handleSearchSubmit}>
                Search
              </Button>
            </Col>
          </Row>

          <div style={{ marginBottom: '150px' }} />

            <Row className="mt-4">
              <Col md={10}>
                <div className="product-list d-flex flex-row">
                  {skincareProducts.map((product, index) => (
                    // Check if index is even, render two products in one row
                    <SkincareProduct
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </Col>
              <Col md={2} className="text-center">
                {cartItems.length > 0 && (
                  <Cart cartItems={cartItems} total={totalPrice} />
                )}
              </Col>
            </Row>
        </div>
      </div>
    </div>
  );
}

export default App;
