import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import getRandomImage from "../../utils/getRandomImage";

export default function ProductDetails() {
  const router = useRouter();
  const { itemId } = router.query;
  const [product, setProduct] = useState(null);

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

  return (
    <div>
      <img src={product.publicImages[0]} alt={getRandomImage()} />
      <h1>{product.name}</h1>
      <p>
        Price:
        {product.defaultPrice.unitAmount / 100000000}
        {product.defaultPrice.currency}
      </p>
      <p>Description: {product.description}</p>

      {/* Render other details of the product */}
    </div>
  );
}
