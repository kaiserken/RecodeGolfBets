module.exports  = function (arr1, arr2, arr3){
  var result1 = [];
  var result2 = [];
  var result3 = [];

  for (var i  = 0; i< arr1.length; i++){
    if (arr1[i] === arr2[i]){
      if (arr2[i] === arr3[i]){
        result1.push(3); result2.push(3); result3.push(3); continue;
      }
      if (arr2[i]< arr3[i]){
        result1.push(4); result2.push(4); result3.push(1); continue;
      }
    result1.push(2); result2.push(2); result3.push(5); continue;
    }
    if (arr2[i] === arr3[i]){
      if (arr2[i]< arr1[i]){
        result1.push(1); result2.push(4); result3.push(4); continue;
      }
    result1.push(5); result2.push(2); result3.push(2); continue;
    }
    if (arr1[i] === arr3[i]){
      if (arr1[i]< arr2[i]){
        result1.push(4); result2.push(1); result3.push(4); continue;
      }
    result1.push(2); result2.push(5); result3.push(2); continue;
    }
    if (arr1[i] < arr2[i] && arr2[i] < arr3[i]){
      result1.push(5); result2.push(3); result3.push(1); continue;
    }
    if (arr1[i] < arr3[i] && arr3[i] < arr2[i]){
      result1.push(5); result2.push(1); result3.push(3); continue;
    }
    if (arr2[i] < arr1[i] && arr1[i] < arr3[i]){
      result1.push(3); result2.push(5); result3.push(1); continue;
    }
    if (arr2[i] < arr3[i] && arr3[i] < arr1[i]){
      result1.push(1); result2.push(5); result3.push(3); continue;
    }
    if (arr3[i] < arr1[i] && arr1[i] < arr2[i]){
      result1.push(3); result2.push(1); result3.push(5); continue;
    }
    if (arr3[i] < arr2[i] && arr2[i] < arr1[i]){
      result1.push(1); result2.push(3); result3.push(5); continue;
    }
  }
  console.log("result1", result1, "result2", result2, "result3" , result3);
}
