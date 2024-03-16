let nextImages = ["/1.jpeg", "/2.jpeg", "/3.jpeg"];

function getRandomImage() {
  let randomNum = Math.floor(Math.random() * nextImages.length);
  return nextImages[randomNum];
}

export default getRandomImage;
