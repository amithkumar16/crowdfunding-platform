"use client";
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { fetchpayments, fetchuser, initiate } from '@/actions/useractions';
import { useSession } from 'next-auth/react';


const Paymentpage = ({ username }) => {
  // Initialize payment form state
  const [paymentform, setPaymentForm] = useState({
    name: '',
    message: '',
    amount: ''
  });



  // Get session data from next-auth
  const { data: session, status } = useSession();

  const [currentuser, setcurrentuser] = useState({})
  const [payments, setpayments] = useState([])

  useEffect(() => {

    getdata()

  }, [])

  // Handle changes in form inputs
  const handleChange = (e) => {
    setPaymentForm({
      ...paymentform,
      [e.target.name]: e.target.value
    });
  };


  const getdata = async (params) => {
    let u = await fetchuser(username)
    setcurrentuser(u)

    let dbpayments = await fetchpayments(username)
    setpayments(dbpayments)
  }

  // Payment function that triggers Razorpay
  const pay = async (amount) => {
    // Call the server-side initiate function to create the order
    const orderDetails = await initiate(amount, username, paymentform); // Assuming `initiate` returns an order object
    const orderid = orderDetails.id; // Get order ID from initiate response

    const options = {
      key: currentuser.razorpay_id, // Enter the Key ID generated from the Dashboard
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "chai", // Your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderid, // Use the order_id returned from the initiate function
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`, // Define your callback URL
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      {/* Include Razorpay's Checkout.js script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full relative h-[350px] mb-16">
        <img
          className="object-cover w-full h-full"
          src={currentuser.profilepic}
          alt=""
        />
        <div className="absolute -bottom-10 right-[46%] border-2 border-white rounded-full">
          <img
            className="rounded-full w-20 h-20"
            src={currentuser.coverpic}
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-14 gap-4">
        <div className="text-3xl text-white font-bold">{username}</div>
        <div className="text-center">lets help {username} to get a chai</div>
        <div className="text-center text-sm text-gray-500">
          {payments.length}Payments . {currentuser.name} has raised ${payments.reduce((a, b) => a + b.amount, 0)}
        </div>

        <div className="payment flex gap-3 w-[80%]">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-3 mb-4">
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
            <ul className="mx-5 text-lg">
              {payments.length == 0 && <li>no payments yet</li>}
              {payments.map((p, i) => {
                return <li key={i} className="flex gap-2 items-center justify-start my-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://tse2.mm.bing.net/th?id=OIP.e1KNYwnuhNwNj7_-98yTRwHaF7&pid=Api&P=0&h=220"
                    alt=""
                  />
                  <span>{p.name} donated {p.amount} with a message {p.message}</span>
                </li>
              })}


            </ul>
          </div>

          <div className="makepayment w-1/2 bg-slate-900 rounded-lg text-white p-3 mb-4">
            <h2 className="text-2xl font-bold my-5">Make your payment</h2>
            <div className="flex flex-col w-full gap-2">
              {/* Payment form inputs */}
              <input
                onChange={handleChange}
                value={paymentform.name}
                name="name"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-700"
                placeholder="Enter name"
              />
              <input
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-700"
                placeholder="Enter message"
              />
              <input
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-700"
                placeholder="Enter amount"
              />
              <button
                onClick={() => pay(parseInt(paymentform.amount))}
                type="button"
                className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${paymentform.name?.length < 3 || !paymentform.message?.length
                  ? "bg-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  }`}
                disabled={paymentform.name?.length < 3 || !paymentform.message?.length}
              >
                Pay
              </button>

            </div>

            <div className="flex gap-2 mt-5">
              {/* Predefined payment buttons */}
              <button className="bg-slate-700 p-3 rounded-lg" onClick={() => pay(10)}>
                Pay $10
              </button>
              <button className="bg-slate-700 p-3 rounded-lg" onClick={() => pay(20)}>
                Pay $20
              </button>
              <button className="bg-slate-700 p-3 rounded-lg" onClick={() => pay(30)}>
                Pay $30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paymentpage;
