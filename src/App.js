import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout"
function App() {
  
  const [product, setproduct] = useState({
    name: "React from FB",
    price : 599,
    productBy: "Facebook"
  })

  const makePayment = token => {
    const body = {
      token, 
      product
    },
    headers = {
      "Content-Type": "application/json"
    }
    return fetch(`http://localhost:8282/payment`,{
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response=>{
      console.log("Response ",response)
      const {status} = response;
      console.log("Status ",status)
    }).catch(err=> console.log(err))
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout shippingAddress billingAddress stripeKey={process.env.REACT_APP_KEY} token={makePayment} amount={product.price*100} name="Buy React!">
          <button className="btn-large pink">Buy React</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
