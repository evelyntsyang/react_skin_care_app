import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";

const Cart = ({ cartItems, total }) => {
  console.log(cartItems);


  return (
    <div className="cart">
      <Card>
        <Card.Header>
          <h3>Cart</h3>
        </Card.Header>
        <h5> Total: $ {total.toFixed(2)}</h5>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            {cartItems.map((c, key) => (
              <Card.Body index={key}>
                <Card>
                  <Card.Header as="h1">{c.branc}</Card.Header>
                  <Card.Body>
                    <Card.Title>{c.name}</Card.Title>
                    <Card.Text>$ {c.price.toFixed(2)}</Card.Text>
                  </Card.Body>
                </Card>

                {/* <p> {c.brand} </p>
                <p> {c.name} </p>
                <p>$  {c.price}</p> */}
              </Card.Body>
            ))}
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cart;
