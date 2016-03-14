
var rootUrl = 'http://127.0.0.1:3000/';

module.exports = function(serverRoute){
  var url  = `${rootUrl}${serverRoute}`;

  return fetch(url)
    .then(function(response){
      return response.json();
    })
    .catch((error) => {
      console.warn(error);
    });
};
