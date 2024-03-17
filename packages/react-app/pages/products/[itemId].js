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
  const [paymentLink, setPaymentLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true); // Set loading state to true when button is clicked
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
          { isPreferred: false, chainId: 1 },
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
      if (data.id) {
        // Construct the payment link
        const link = `https://buy.copperx.dev/payment/payment-link/${data.id}`;
        // Set the payment link state
        setPaymentLink(link);
      } else {
        console.error('No id found in response');
      }
      console.log(data);
    } catch (error) {
      console.error("Error creating payment link:", error);
    }finally {
      setIsLoading(false); // Set loading state to false after handling click event
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
        className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      >
         {isLoading ? 'Generating...' : 'Generate Payment Link by '}
        Creating Payment Link
      </button>
      {paymentLink && !isLoading && (
        <div>
          <p>Payment Link:</p>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{paymentLink}</a>
        </div>
      )}
    </div>
  );
}
