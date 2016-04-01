module.exports = function(results, bet){

  var bets  = results.map(function(element){
    if (element[element.length-1] === "AS" || element[element.length-1]=== "-" ){
      return 0;
    }
    if (parseInt(element[element.length-1]) < 0 ){
      return -bet;
    }
    if (parseInt(element[element.length-1]) > 0 ){
      return bet;
    }
  });
  var total  = bets.reduce(function(sum, bet){
    return sum + bet;
  }, 0);
  console.log("nassau calc", total)
  return total;
};
