
// arr is array of 4 score arrays

module.exports = function(arr, teamArr, lowS, lowT) {
var results = [[],[],[],[]],
  scoreteam1 = 0,
  scoreteam2 = 0,
  carryScore = 0,
  carryTotal = 0,
  carryScore1 = 0,
  carryTotal1 = 0,
  carryScore2 = 0,
  carryTotal2 = 0;

  for (var i = 0; i < arr[0].length; i++){
    if (i<=5){
      if (Math.min(arr[teamArr[0]-1][i],arr[teamArr[1]-1][i])=== Math.min(arr[teamArr[2]-1][i],arr[teamArr[3]-1][i])){
        carryScore+=lowS;
      } else{
        if (Math.min(arr[teamArr[0]-1][i],arr[teamArr[1]-1][i])< Math.min(arr[teamArr[2]-1][i],arr[teamArr[3]-1][i])){
          scoreteam1 = lowS + carryScore;
          scoreteam2 = -lowS - carryScore;
          carryScore=0;
        } else {
          scoreteam2 = lowS + carryScore;
          scoreteam1 = -lowS - carryScore;
          carryScore=0;
        }
      }
      if ((arr[teamArr[0]-1][i]+ arr[teamArr[1]-1][i]) === (arr[teamArr[2]-1][i]+arr[teamArr[3]-1][i])){
        carryTotal+=lowT;
      }else {
        if (Math.min(arr[teamArr[0]-1][i]+ arr[teamArr[1]-1][i])< Math.min(arr[teamArr[2]-1][i]+arr[teamArr[3]-1][i])){
          scoreteam1 += lowT + carryTotal;
          scoreteam2 += -lowT - carryTotal;
          carryTotal=0;
        } else {
          scoreteam2 += lowT + carryTotal;
          scoreteam1 += -lowT - carryTotal;
          carryTotal=0;
        }
      }
      results[teamArr[0]-1].push(scoreteam1); results[teamArr[1]-1].push(scoreteam1);
      results[teamArr[2]-1].push(scoreteam2); results[teamArr[3]-1].push(scoreteam2);
      scoreteam1 = 0;
      scoreteam2 = 0;
    }

    if (i>5 && i<=11){
      if (Math.min(arr[teamArr[4]-1][i],arr[teamArr[5]-1][i])=== Math.min(arr[teamArr[6]-1][i],arr[teamArr[7]-1][i])){
        carryScore1+=lowS;
      } else{
        if (Math.min(arr[teamArr[4]-1][i],arr[teamArr[5]-1][i])< Math.min(arr[teamArr[6]-1][i],arr[teamArr[7]-1][i])){
          scoreteam1 = lowS + carryScore1;
          scoreteam2 = -lowS - carryScore1;
          carryScore1=0;
        } else {
          scoreteam2 = lowS + carryScore1;
          scoreteam1 = -lowS - carryScore1;
          carryScore1=0;
        }
      }
      if ((arr[teamArr[4]-1][i]+ arr[teamArr[5]-1][i]) === (arr[teamArr[6]-1][i]+arr[teamArr[7]-1][i])){
        carryTotal1+=lowT;
      }else {
        if (Math.min(arr[teamArr[4]-1][i]+ arr[teamArr[5]-1][i])< Math.min(arr[teamArr[6]-1][i]+arr[teamArr[7]-1][i])){
          scoreteam1 += lowT + carryTotal1;
          scoreteam2 += -lowT - carryTotal1;
          carryTotal1=0;
        } else {
          scoreteam2 += lowT + carryTotal1;
          scoreteam1 += -lowT - carryTotal1;
          carryTotal1=0;
        }
      }
      results[teamArr[4]-1].push(scoreteam1); results[teamArr[5]-1].push(scoreteam1);
      results[teamArr[6]-1].push(scoreteam2); results[teamArr[7]-1].push(scoreteam2);
      scoreteam1 = 0;
      scoreteam2 = 0;
    }

    if (i>11 && i<=17){
      if (Math.min(arr[teamArr[8]-1][i],arr[teamArr[9]-1][i])=== Math.min(arr[teamArr[10]-1][i],arr[teamArr[11]-1][i])){
        carryScore2+=lowS;
      } else{
        if (Math.min(arr[teamArr[8]-1][i],arr[teamArr[9]-1][i])< Math.min(arr[teamArr[10]-1][i],arr[teamArr[11]-1][i])){
          scoreteam1 = lowS + carryScore2;
          scoreteam2 = -lowS - carryScore2;
          carryScore2=0;
        } else {
          scoreteam2 = lowS + carryScore2;
          scoreteam1 = -lowS - carryScore2;
          carryScore2=0;
        }
      }
      if ((arr[teamArr[8]-1][i]+ arr[teamArr[9]-1][i]) === (arr[teamArr[10]-1][i]+arr[teamArr[11]-1][i])){
        carryTotal2+=lowT;
      }else {
        if (Math.min(arr[teamArr[8]-1][i]+ arr[teamArr[9]-1][i])< Math.min(arr[teamArr[10]-1][i]+arr[teamArr[11]-1][i])){
          scoreteam1 += lowT + carryTotal2;
          scoreteam2 += -lowT - carryTotal2;
          carryTotal2=0;
        } else {
          scoreteam2 += lowT + carryTotal2;
          scoreteam1 += -lowT - carryTotal2;
          carryTotal2=0;
        }
      }
      results[teamArr[8]-1].push(scoreteam1); results[teamArr[9]-1].push(scoreteam1);
      results[teamArr[10]-1].push(scoreteam2); results[teamArr[11]-1].push(scoreteam2);
      scoreteam1 = 0;
      scoreteam2 = 0;
    }
  }

  return results;
};
