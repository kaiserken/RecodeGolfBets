
var rootUrl = 'https://aqueous-depths-34500.herokuapp.com/';

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
