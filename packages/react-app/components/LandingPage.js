import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../pages/api/products";
import axios from "axios";
import Card from "./Card.js";
import getRandomImage from "../utils/getRandomImage";

export default function LandingPage() {
  const [data, setData] = useState([]);

  // Function to add an item to the basket
  const addToBasket = () => {
    // Here, you would typically add the item to the basket
    // For demonstration, let's assume you have an item object
    const newItem = {
      id: 1, // Example item ID
      name: "Sample Item", // Example item name
      price: 10, // Example item price
    };

    // Add the new item to the basket
    setBasketItems((prevItems) => [...prevItems, newItem]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.copperx.dev/api/v1/products",
          {
            headers: {
              accept: "application/json",
              authorization:
                "Bearer pav1_QKCutuiqdIZ4HnehWIuereXSLyTdz7KG1yyr3gsShk8sy7veFOEtobc5vt9fBH65",
            },
          }
        );
        const result = await response.json();
        console.log(result.data)
        setData(result.data); // Update data state with the fetched array object
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <>
      <div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 clickable-card">
          {data.map((item, index) => (
            <div
              key={index}
              className="group relative max-w-sm rounded overflow-hidden shadow-lg"
            >
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                {/* <img
                  src="https://github.com/amoweolubusayo/RSVP-composer/assets/20168921/da44a639-b4c2-430b-9c84-362b49e601d5"
                  alt="backup"
                /> */}
                 <img src={getRandomImage()} alt={getRandomImage()} />
              </div>
              <div className="mt-4 flex justify-between pl-4">
                <div>
                  <h3 className="text-bg font-weight-bold text-gray-900">
                    {item.name}
                  </h3>
                  <b>
                    {" "}
                    <p className="mt-2 text-sm text-gray-500">
                      Price: 1
                     
                    </p>
                  </b>
                </div>
              </div>
              <div className="mt-4 flex pl-4">
                <button className="inline-block bg-gray-200 rounded-full mt-2 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Add to Basket
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
