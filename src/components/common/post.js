var rootUrl = 'https://aqueous-depths-34500.herokuapp.com/';


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
