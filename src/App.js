// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./screens/Home";
import Cars from "./screens/Cars";
import CarDetails from "./screens/CarDetails";
import MyBookings from "./screens/MyBookings";
import BookingDetails from "./screens/BookingDetails";
import BlogSection from "./components/BlogSection";
import BlogDetails from "./screens/BlogDetails";

import About from "./screens/About";
import ContractForm from "./screens/ContractForm";
import Checkout from "./screens/Checkout";   // ⬅ ADD THIS
import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* Public / customer routes */}
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/checkout" element={<Checkout />} />  {/* ⬅ ADD THIS */}
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/my-bookings/:id" element={<BookingDetails />} />
            <Route path="/blog" element={<BlogSection />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contract" element={<ContractForm />} />


            {/* Optional 404 page */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
