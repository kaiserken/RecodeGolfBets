module.exports  = function ( playerCount, hcp1, hcp2, hcp3, hcp4){
  var strokes1;
  var strokes2;
  var strokes3;
  var strokes4;
  var strokesGiven  = [];

  if (playerCount === 2){
    if (hcp1 <= hcp2){
      strokes1 = 0;
      strokes2 = hcp2 - hcp1;
    } else {
      strokes2 = 0;
      strokes1 = hcp1 - hcp2;
    }
    strokesGiven.push(strokes1, strokes2);
    return strokesGiven;
  }

  if (playerCount === 3){
    if (hcp1 <= hcp2 && hcp1 <= hcp3){
      strokes1 = 0;
      strokes2 = hcp2 - hcp1;
      strokes3 = hcp3 - hcp1;
    } else if  (hcp2 <= hcp1 && hcp2 <= hcp3){
      strokes1 = hcp1 - hcp2;
      strokes2 = 0;
      strokes3 = hcp3 - hcp2;
    } else {
      strokes1 = hcp1 - hcp3;
      strokes2 = hcp2 - hcp3;
      strokes3 = 0;
    }
    strokesGiven.push(strokes1, strokes2, strokes3);
    return strokesGiven;
  }
  if (playerCount === 4){
    if (hcp1 <= hcp2 && hcp1 <= hcp3 && hcp1 <= hcp4){
      strokes1 = 0;
      strokes2 = hcp2 - hcp1;
      strokes3 = hcp3 - hcp1;
      strokes4 = hcp4 - hcp1;
    } else if  (hcp2 <= hcp1 && hcp2 <= hcp3 && hcp2 <= hcp4){
      strokes1 = hcp1 - hcp2;
      strokes2 = 0;
      strokes3 = hcp3 - hcp2;
      strokes4 = hcp4 - hcp2;
    } else if  (hcp3 <= hcp1 && hcp3 <= hcp2 && hcp3 <= hcp4){
      strokes1 = hcp1 - hcp3;
      strokes2 = hcp2 - hcp3;
      strokes3 = 0;
      strokes4 = hcp4 - hcp3;
    } else {
      strokes1 = hcp1 - hcp4;
      strokes2 = hcp2 - hcp4;
      strokes3 = hcp3 - hcp4;
      strokes4 = 0;
    }
    strokesGiven.push(strokes1, strokes2, strokes3, strokes4);
    return strokesGiven;
  }
}
