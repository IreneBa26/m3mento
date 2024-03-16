var options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: 'Bearer pav1_QKCutuiqdIZ4HnehWIuereXSLyTdz7KG1yyr3gsShk8sy7veFOEtobc5vt9fBH65'
    }
};
fetch('https://api.copperx.dev/api/v1/products', options)
    .then(function (response) { return response.json(); })
    .then(function (response) { return console.log(response); })["catch"](function (err) { return console.error(err); });
