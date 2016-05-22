//set casper to run
var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,
        loadPlugins: false
    },
    logLevel: "debug",
    verbose: true
  }),
  settings = require('./settings');

var url = 'http://www.supremenewyork.com/shop/all/accessories';
var user = settings.user;
var product = settings.product;


casper.on('remote.message', function(msg) {
  this.echo(msg);
})

casper.on('error', function(error) {
  this.echo(error);
})

function findItem() {
  var className = 'name-link';
  var links = document.getElementsByClassName(className);
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.innerHTML === 'You Still Suck Keychain') {
      return link.getAttribute('href');
    };
  }
  return null;
}

function casperBot() {
  //load url and add item to cart.
  casper.start(url, function() {
    this.waitForSelector('div[id="container"]', function() {
      var link = 'http://supremenewyork.com' + this.evaluate(findItem);
      this.thenOpen(link);
    })
  });

  casper.then(function selectItem() {
    casper.waitForSelector("input[type=submit]", function() {
      this.capture('img/initial.png');
      this.click("input[type=submit]");
    })
  })
  //after add to cart, open the checkout screen
  casper.then(function() {
    this.wait(1500, function() {
      this.open("https://www.supremenewyork.com/checkout")
    })
  })
  //fill out checkout form
  casper.then(function() {
    this.fill('form#checkout_form', {
      'order[billing_name]': user.name,
      'order[email]': user.email,
      'order[tel]': user.tel,
      'order[billing_address]': user.address,
      'order[billing_zip]': user.zip,
      'order[billing_city]': user.city,
      'order[billing_state]': user.state,
      'credit_card[type]': user.credit_card,
      'credit_card[cnb]': user.cnb,
      'credit_card[month]': user.c_month,
      'credit_card[year]': user.c_year,
      'credit_card[vval]': user.ccv
    });
  })
  casper.then(function() {
    this.capture('img/cart.png');
  })

  casper.run();
}

module.exports = exports = casperBot;