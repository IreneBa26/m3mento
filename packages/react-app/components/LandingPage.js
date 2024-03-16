import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../pages/api/products";
import Card from "./Card.js";

export default function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []); // Empty dependency array to run the effect only once
  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <p key={product.id} name={product.name} />
        ))}
      </div>
    </>
  );
}
