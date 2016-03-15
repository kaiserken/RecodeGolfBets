
var rootUrl = 'http://10.0.1.13:3000/';

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
