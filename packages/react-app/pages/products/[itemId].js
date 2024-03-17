import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import getRandomImage from "../../utils/getRandomImage";

export default function ProductDetails() {
  const router = useRouter();
  const { itemId } = router.query;
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://api.copperx.dev/api/v1/products/${itemId}`,
          {
            headers: {
              accept: "application/json",
              authorization:
                "Bearer pav1_QKCutuiqdIZ4HnehWIuereXSLyTdz7KG1yyr3gsShk8sy7veFOEtobc5vt9fBH65",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setProduct(data);
        setProductId(data.id)
        setProductName(data.name)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (itemId) {
      fetchProduct();
    }
  }, [itemId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = async () => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization:
          "Bearer pav1_QKCutuiqdIZ4HnehWIuereXSLyTdz7KG1yyr3gsShk8sy7veFOEtobc5vt9fBH65",
      },
      body: JSON.stringify({
        type: "one_time",
        nameCollection: false,
        emailCollection: false,
        phoneNumberCollection: false,
        shippingAddressCollection: false,
        billingAddressCollection: false,
        submitType: "pay",
        afterCompletion: "hosted_confirmation",
        amount: 100000000,
        currency: "matic",
        title: productName,
        tags: ["chocolate"],
        allowedChains: [
          { isPreferred: false, chainId: 80001 },
          { isPreferred: false, chainId: 5 },
        ],
        productId: productId,
        allowPromotionCodes: false,
        suggestedCurrency: "usdc",
        afterCompletionConfirmMsg: "Successful, check wallet shortly",
      }),
    };

    try {
      const response = await fetch(
        "https://api.copperx.dev/api/v1/payment-links",
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error creating payment link:", error);
    }
  };
  return (
    <div>
      {product.defaultPriceId === null ? (
        <img src={getRandomImage()} alt={getRandomImage()} />
      ) : (
        <img src={product.publicImages[0]} alt={getRandomImage()} />
      )}

      <h1>{product.name}</h1>
      <p>
        Price:
        {product.defaultPriceId === null
          ? 1
          : product.defaultPrice.unitAmount / 100000000}
        {/* {product.defaultPrice.unitAmount / 100000000} */}
        {product.defaultPriceId === null
          ? "usdt"
          : product.defaultPrice.currency}
        {/* // {product.defaultPrice.currency} */}
      </p>

      <p>
        Description:{" "}
        {product.defaultPriceId === null ? "no desc" : product.description}{" "}
      </p>

      {/* Render other details of the product */}
      <button
        onClick={() => handleButtonClick(product.id, product.name)}
      >
        Create Payment Link
      </button>
    </div>
  );
}
