// ramda-style forEachish object traversal (func covenant : (key, value))
var traverseObj = function (func, obj) {
  var partialTraverse =  function (partialObj) {
    for (var c in partialObj) {
      func(c, partialObj[c]);
      if (partialObj[c] !== null && typeof (partialObj[c]) === "object") {
        traverseObj(func, partialObj[c]);
      }
    }
    return partialObj;
  };
  
  if (obj === null || typeof obj === "undefined") {
    return partialTraverse; 
  } else {
    return partialTraverse(obj);
  }
};

// ramda-style mappish object traversal (func covenant: (key, value))
var mapObj = function (func, obj) {
  if (obj === null || typeof obj === "undefined") {
    return function(partialObj){
      var partialAccumulator = [];
      traverseObj(function(key, value) {
        partialAccumulator.push(func(key, value));
      }, partialObj);
      return partialAccumulator;
    };
  } else {
    var accumulator = [];
    traverseObj(function(key, value) {
      accumulator.push(func(key, value));
    });
    return accumulator;
  }
};
