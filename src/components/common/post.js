var rootUrl = 'http://127.0.0.1:3000/';


module.exports = function(serverRoute, content){
  var url  = `${rootUrl}${serverRoute}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content)
  })
    .then(function(response){
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
