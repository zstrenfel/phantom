
var page = require('webpage').create();
page.settings.loadImages = true;
var start;


//timing tools.
page.onLoadStarted = function() {
  console.log('load started');
  start = Date.now();
}

page.onLoadFinished = function() {
  var end = Date.now();
  console.log('load finished in: ' + (end - start) + "ms");
}

page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    });
};



var findInput = function(document, value) {
  var allInputs = document.getElementsByTagName('input');
  for (var i = 0; i < allInputs.length; i++) {
    if (allInputs[i].value === value) {
      return allInputs[i];
    }
  }
  return null;
}

var test = function() {
  return "it works";
}

page.open('http://www.supremenewyork.com/shop/accessories/az1tlcova/red', function(status) {
  if (status === "success") {
    var title =  page.evaluate(function() {
      return test();
    })
  console.log(title);
  } else {
    console.log("couldn't load the specified webpage.");
  }
  page.render("input.png");
  phantom.exit();
});