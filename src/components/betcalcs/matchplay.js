
// takes an array (arr) of player score arrays between 2-4 returns an nested array of results
module.exports = function(arr, team, nassau) {
  var results1 = [],
    matchResults = [],
    state = 0;
    stateArray = [];

  if (arr.length === 2){
    for (var i = 0; i<arr[0].length; i++){
      if(arr[0][i]===arr[1][i]){
        results1.push(0);
      } else {
        if(arr[0][i]<arr[1][i]){
          results1.push(1);
        } else {
          results1.push(-1);
        }
      }
      state = results1.reduce(function(sum, result){
        return sum + result;
      },0);

      if (nassau){stateArray.push(state);}

      if (state===0){
        matchResults.push("AS");
      } else {
        if (state>0){
          matchResults.push("+"+state);
        } else {
          matchResults.push(state);
        }
      }
      if(!nassau){
        if (Math.abs(state)>18-results1.length){
          break;
        }
      }
    }
  }
  if (arr.length === 4){
    for (var i = 0; i<arr[0].length; i++){
      if(Math.min(arr[team[0]-1][i],arr[team[1]-1][i]) === Math.min(arr[team[2]-1][i],arr[team[3]-1][i])){
        results1.push(0);
      } else {
        if(Math.min(arr[team[0]-1][i],arr[team[1]-1][i]) < Math.min(arr[team[2]-1][i],arr[team[3]-1][i])){
          results1.push(1);
        } else {
          results1.push(-1);
        }
      }
      state = results1.reduce(function(sum, result){
        return sum + result;
      },0);

      if (nassau){stateArray.push(state);}

      if (state===0){
        matchResults.push("AS");
      } else {
        if (state>0){
          matchResults.push("+"+state);
        } else {
          matchResults.push(state);
        }
      }
      if(!nassau){
        if (Math.abs(state)>18-results1.length){
          break;
        }
      }
    }
  }
  if(nassau){return [matchResults, stateArray];}
  return [matchResults];
};
