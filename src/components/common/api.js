
var rootUrl = 'http://192.168.1.141:3000/';

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
