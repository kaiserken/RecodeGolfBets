var MatchPlay  = require('./matchplay');


module.exports = function(scores, team) {
  var totalbets = [];
  var frontbets = [];
  var backbets = [];
  var total = MatchPlay(scores, team, "nassau");
  totalbets.push(total[0]);

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
  Bets(scores, total, team, totalbets);
  return totalbets;
};
