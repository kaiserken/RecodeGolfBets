var MatchPlay  = require('./matchplay');


module.exports = function(scores, team, auto) {
  var totalbets = [];
  var total = MatchPlay(scores, team, "nassau");
  totalbets.push(total[0]);

  if (auto === true){

    Bets(scores, total, team, totalbets);
  }

  totalbets.map(function(element){
    var y  = totalbets[0].length-1;
    while (element.length <= y){
      element.unshift('-');
    }
  });
  
  return totalbets;
};

function Bets(scores, total, team, totalbets){
  for (var i = 0; i<total[1].length; i++){
    var state = (total[1][i]);
    if (Math.abs(state) === 2){
      if (scores.length ===4){
        total = MatchPlay([scores[0].slice(i+1), scores[1].slice(i+1),scores[2].slice(i+1), scores[3].slice(i+1)], team, "nassau");
      } else {
        total = MatchPlay([scores[0].slice(i+1), scores[1].slice(i+1)], team, "nassau");
      }
      totalbets.push(total[0]);
      if (scores.length ===4){
      scores = [scores[0].slice(i+1), scores[1].slice(i+1),scores[2].slice(i+1), scores[3].slice(i+1)];
    } else{
      scores = [scores[0].slice(i+1), scores[1].slice(i+1)];
    }
      return Bets(scores, total, team, totalbets);
    }
  }
  return;
}
