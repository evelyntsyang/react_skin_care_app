// src/SkincareProduct.js

import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";

const SkincareProduct = ({ product, onAddToCart }) => {
  const { name, brand, price, image } = product;

  const handleAddToCartClick = () => {
    onAddToCart(product);
  };

  return (
    <>
      {" "}
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Container style={{height : "200px"}}  >
            {" "}
            <Card.Title><h5>{name}</h5></Card.Title>
            <Card.Text>Price: ${price}</Card.Text>
          </Container>

          <Card.Img
            variant="top"
            src={require(`../src/assets/img/${image}`)}
            style={{
              height: "45%",
            }}
          />
        </Card.Body>
        <Button onClick={handleAddToCartClick} variant="dark">
          Add To Cart
        </Button>
      </Card>
    </>
  );
};

export default SkincareProduct;
