let nextImages = [
  "https://github.com/IreneBa26/m3mento/assets/151834271/f4f83a9c-35b0-4336-9a4b-7379ec7adccf",
  "https://github.com/IreneBa26/m3mento/assets/151834271/e6765475-3792-4ded-a80d-2d2f7f8ec105",
  "https://github.com/IreneBa26/m3mento/assets/151834271/82146838-7094-40bc-bd87-f7a7717182d0",
  "https://github.com/IreneBa26/m3mento/assets/151834271/5c59014f-53c7-4a71-9e32-7b9a68d49faa",
  "https://github.com/IreneBa26/m3mento/assets/151834271/fc085e3d-9b3e-4a42-bf3d-d3734dc4b532",
  "https://github.com/IreneBa26/m3mento/assets/151834271/f8b75cc1-ced1-4623-ac08-3dca63b0d629",
  "https://github.com/IreneBa26/m3mento/assets/151834271/ec001ed7-a8b0-46b8-a33a-307e874370c5",
  "https://github.com/IreneBa26/m3mento/assets/151834271/7be2d1c8-7be2-40bc-9580-80b6e84cb96a",
  "https://github.com/IreneBa26/m3mento/assets/151834271/6c15b7c3-e29b-4da7-9b50-9bd36e527f24",
  "https://github.com/IreneBa26/m3mento/assets/151834271/6fb0dbea-c8fe-4891-94f3-38cea2d3180e",
  "https://github.com/IreneBa26/m3mento/assets/151834271/ae769923-7f37-49ff-8ddf-3ae1f30a5ddc",
  "https://github.com/IreneBa26/m3mento/assets/151834271/da47e5b5-f31e-4490-9458-ec7febc2147b",
];

function getRandomImage() {
  let randomNum = Math.floor(Math.random() * nextImages.length);
  return nextImages[randomNum];
}

export default getRandomImage;
