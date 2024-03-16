export function fetchProducts() {
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer pav1_QKCutuiqdIZ4HnehWIuereXSLyTdz7KG1yyr3gsShk8sy7veFOEtobc5vt9fBH65'
    }
  };


 return fetch('https://api.copperx.dev/api/v1/products', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

}