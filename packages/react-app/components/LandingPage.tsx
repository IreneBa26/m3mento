import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card.js";
import getRandomImage from "../utils/getRandomImage";
import { useRouter } from "next/router";

export default function LandingPage() {
  const [data, setData]: Array<any> = useState([]);
  const [shopItems, setShopItems]: Array<any> = useState([])
  const router = useRouter();
  const API_AUTH_TOKEN = process.env.HACK_KEY;

    // TODO: add to when adding an item to the basket, substrackt if removing an item
  // TODO: move basket ot page, create as background and add number counder inside with a red round background
  const [counter, setCounter] = useState(0);
  const [basketItems, setBasketItems]: Array<any> = useState([])
  // Function to add an item to the basket
  const addToBasket = (index: number) => {
    // Here, you would typically add the item to the basket
    // For demonstration, let's assume you have an item object
    // const newItem = {
    //   id: 1, // Example item ID
    //   name: "Sample Item", // Example item name
    //   price: 10, // Example item price
    // };

    const newItem = shopItems[index]

    // Add the new item to the basket
    setBasketItems([...basketItems, newItem]);

  };

   // Function to add an item to the basket
  const removeFromBasket = (index: number) => {

    // Remove Item from Basket
    setBasketItems([...basketItems.slice(0, index), ...basketItems.slice(index + 1)]);

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.copperx.dev/api/v1/products?limit=50",
          {
            headers: {
              accept: "application/json",
              authorization:
              `Bearer ${API_AUTH_TOKEN}`,
            },
          }
        );
        const result = await response.json();
        console.log(result.data);
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

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <button
            onClick={() => router.push('/basket')}
            style={{
              backgroundColor: '#cccccc', // Light grey 
              color: 'white', // White text
              padding: '10px 20px', // Padding around text
              borderRadius: '20px', // Rounded corners
              border: 'none', // No border
              cursor: 'pointer', // Pointer cursor on hover
              outline: 'none', // No outline
              fontSize: '16px', // Font size
              fontWeight: 'bold', // Font weight
              textTransform: 'uppercase', // Uppercase text
              margin: '10px 0', // Margin around button
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' // Box shadow for depth
            }}
          >
            Go to Basket
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 clickable-card">
                  {/* @ts-ignore */}
          {data.map((item, index) => (
            <div
              key={index}
              className="group relative max-w-sm rounded overflow-hidden shadow-lg"
            >
              <Link href={`/products/${item.id}`}>
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  {item.defaultPriceId === null ? (
                    <img src={getRandomImage()} alt={getRandomImage()} />
                  ) : (
                    <img src={item.publicImages[0]} alt={getRandomImage()} />
                  )}
                </div>
              </Link>
              <div className="mt-4 flex justify-between pl-4">
                <div>
                  <h3 className="text-bg font-weight-bold text-gray-900">
                    {item.name}
                  </h3>
                  <b>
                    {" "}
                    <p className="mt-2 text-sm text-gray-500">
                      Price:{" "}
                      {item.defaultPriceId === null
                        ? 1
                        : item.defaultPrice.unitAmount / 100000000}
                      {item.defaultPriceId === null
                        ? "usdc"
                        : item.defaultPrice.currency}
                    </p>
                  </b>
                </div>
              </div>
              {/* <div className="mt-4 flex pl-4">
                <button className="inline-block bg-gray-200 rounded-full mt-2 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Add to Basket
                </button>
              </div> */}
            {/* </div>
          ))}
        </div>
      </div>
    </>
  );
} */}
<div className="mt-4 flex flex-row justify-center items-center w-auto pl-4 inline-block bg-gray-200 rounded-full mt-2 px-3  text-sm font-semibold text-gray-700 mr-2 mb-2">
<button onClick={()=>removeFromBasket(index)} className="inline-block bg-gray-200 rounded-full mt-2 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">                  -
                </button>
                <p>{counter}</p>
                <button onClick={()=>addToBasket(index)} className="inline-block bg-gray-200 rounded-full mt-2 px-3 text-sm font-semibold text-gray-700 mr-2 mb-2">
             +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <button
            onClick={() => router.push('/basket')}
            style={{
              backgroundColor: '#cccccc', // Light grey background
              color: 'white', // White text
              padding: '10px 20px', // Padding around text
              borderRadius: '20px', // Rounded corners
              border: 'none', // No border
              cursor: 'pointer', // Pointer cursor on hover
              outline: 'none', // No outline
              fontSize: '16px', // Font size
              fontWeight: 'bold', // Font weight
              textTransform: 'uppercase', // Uppercase text
              margin: '10px 0', // Margin around button
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' // Box shadow for depth
            }}
          >
            Go to Basket
          </button>
        </div>
      </div>
    </>
  );
}