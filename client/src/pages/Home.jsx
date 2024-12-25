import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Home = () => {
  const cartItems = [
    {
      id: 1,
      name: "Laptop",
      quantity: 1,
      price: 999.99,
    },
    {
      id: 2,
      name: "Wireless Mouse",
      quantity: 2,
      price: 25.5,
    },
    {
      id: 3,
      name: "Keyboard",
      quantity: 1,
      price: 49.99,
    },
    {
      id: 4,
      name: "USB-C Cable",
      quantity: 3,
      price: 15.0,
    },
    {
      id: 5,
      name: "Headphones",
      quantity: 1,
      price: 199.99,
    },
  ];

  const [item, setItem] = useState([...cartItems]);

  const payNow = async () => {
    const stripe = await loadStripe(
      "pk_test_51QZzM8IbCLEUx03xnQLviGGAbfbVBxVyyWRWqdGAa2JEsR8hs8qThA8C9VYbpXYTCnoQ1x3mG5AsSJX93gR9onlB00gVe4a8mN"
    );

    const response = await axios.post("http://localhost:3000/api/v1/checkout", {
      products: item,
    });

    console.log(response.data.id);

    const result = stripe.redirectToCheckout({
      sessionId: response.data.id,
    });
  };

  const increaseQuantity = (index) => {
    item[index].quantity += 1;
    setItem([...item]);
  };
  const decreaseQuantity = (index) => {
    item[index].quantity -= 1;
    setItem([...item]);
  };
  const deleteItem = (index) => {
    item.splice(index, 1);
    setItem([...item]);
  };
  return (
    <>
      <h1>Checkout</h1>

      <div>
        {item.map((item, index) => {
          return (
            <div
              style={{
                border: "1px solid black",
                borderRadius: "20px",
                padding: "20px",
                margin: "10px",
              }}
              key={item.id}
            >
              <h2>Name {item.name}</h2>
              <button onClick={() => decreaseQuantity(index)}>-</button>
              <h3>quantity {item.quantity}</h3>
              <button onClick={() => increaseQuantity(index)}>+</button>
              <h3>price {item.price * item.quantity}</h3>
              <button onClick={() => deleteItem(index)}>delete</button>
            </div>
          );
        })}

        <div
          style={{
            textAlign: "center",
            margin: "50px",
          }}
        >
          <button onClick={payNow}>Pay Now</button>
        </div>
      </div>
    </>
  );
};

export default Home;