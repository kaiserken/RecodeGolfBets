
// takes an array arr of player score arrays between 2-4 returns an array of arrays
module.exports  = function(arr, bet, carry) {
  var carrybets = 0,
    results1 = [],
    results2 = [],
    results3 = [],
    results4 = [];

  if (arr.length === 2){
    for (var i = 0; i<arr[0].length; i++){
      if (arr[0][i]===arr[1][i]){
        if (carry === true){
          results1.push(0); results2.push(0); carrybets += bet; continue;
        } else {
          results1.push(0); results2.push(0); continue;
        }
      }
      if (arr[0][i]<arr[1][i]){
        results1.push(bet+carrybets);

        results2.push(-bet-carrybets);
        carrybets = 0;
      }
      if (arr[0][i] > arr[1][i]){
        results2.push(bet+carrybets);

        results1.push(-bets-carrybets);
        carrybets = 0;
      }
    }
    return [results1, results2];
  }

  if(arr.length === 3){
    for (var i  = 0; i< arr[0].length; i++){
      var temp  = [arr[0][i], arr[1][i], arr[2][i]];
      var min  = temp.indexOf(Math.min(arr[0][i], arr[1][i], arr[2][i]));

      if (min===0){
        if (arr[0][i]===arr[1][i] || arr[0][i] === arr[2][i]){
          if (carry === true){
            results1.push(0); results2.push(0); results3.push(0); carrybets += bet; continue;
          }else{
            results1.push(0); results2.push(0); results3.push(0); continue;
          }
        }
        results1.push(2*(bet+carrybets));

        results2.push(-bets-carrybets);
        results3.push(-bets-carrybets);
        carrybets = 0;
        continue;
      }

      if (min===1){
        if (arr[1][i]===arr[0][i] || arr[1][i] === arr[2][i]){
          if (carry === true){
            results1.push(0); results2.push(0); results3.push(0); carrybets += bet; continue;
          }else{
            results1.push(0); results2.push(0); results3.push(0); continue;
          }
        }
        results2.push(2*(bet+carrybets));

        results1.push(-bet-carrybets);
        results3.push(-bet-carrybets);
        carrybets = 0;
        continue;
      }

      if (min===2){
        if (arr[2][i]===arr[0][i] || arr[2][i] === arr[1][i]){
          if (carry === true){
            results1.push(0); results2.push(0); results3.push(0); carrybets += bet; continue;
          }else{
            results1.push(0); results2.push(0); results3.push(0); continue;
          }
        }
        results3.push(2*(bet+carrybets));

        results1.push(-bet-carrybets);
        results2.push(-bet-carrybets);
        carrybets = 0;
        continue;
      }
    }
    return [results1, results2, results3];
  }

  if(arr.length === 4){
    for (var i  = 0; i< arr[0].length; i++){
      var temp  = [arr[0][i], arr[1][i], arr[2][i], arr[3][i]];
      var min  = temp.indexOf(Math.min(arr[0][i], arr[1][i], arr[2][i], arr[3][i]));

      if (min===0){
        if (arr[0][i]===arr[1][i] || arr[0][i] === arr[2][i] || arr[0][i] === arr[3][i]){
          if (carry === true){
            results1.push(0); results2.push(0); results3.push(0); results4.push(0);  carrybets += bet; continue;
          }else{
            results1.push(0); results2.push(0); results3.push(0); results4.push(0); continue;
          }
        }
        results1.push(3*(bet+carrybets));

        results2.push(-bet-carrybets);
        results3.push(-bet-carrybets);
        results4.push(-bet-carrybets);
        carrybets = 0;
        continue;
      }

      if (min===1){
        if (arr[1][i]===arr[0][i] || arr[1][i] === arr[2][i] || arr[1][i] === arr[3][i]){
          if (carry === true){
            results1.push(0); results2.push(0); results3.push(0); results4.push(0);  carrybets += bet; continue;
          }else{
            results1.push(0); results2.push(0); results3.push(0); results4.push(0); continue;
          }
        }
        results2.push(3*(bet+carrybets));

        results1.push(-bet-carrybets);
        results3.push(-bet-carrybets);
        results4.push(-bet-carrybets);
        carrybets = 0;
        continue;
      }

      if (min===2){
        if (arr[2][i]===arr[0][i] || arr[2][i] === arr[1][i] || arr[2][i] === arr[3][i]){
          if (carry === true){
            results1.push(0); results2.push(0); results3.push(0); results4.push(0);  carrybets += bet; continue;
          }else{
            results1.push(0); results2.push(0); results3.push(0); results4.push(0); continue;
          }
        }
        results3.push(3*(bet+carrybets));

        results1.push(-bet-carrybets);
        results2.push(-bet-carrybets);
        results4.push(-bet-carrybets);
        carrybets = 0;
        continue;
      }

      if (min===3){
        if (arr[3][i]===arr[0][i] || arr[3][i] === arr[1][i] || arr[3][i] === arr[2][i]){
          if (carry === true){
            results1.push(0); results2.push(0); results3.push(0); results4.push(0);  carrybets += bet; continue;
          }else{
            results1.push(0); results2.push(0); results3.push(0); results4.push(0); continue;
          }
        }
        results4.push(3*(bet+carrybets));

        results1.push(-bet-carrybets);
        results2.push(-bet-carrybets);
        results3.push(-bet-carrybets);
        carrybets = 0;
        continue;
      }
    }
    return [results1, results2, results3, results4];
  }
};
