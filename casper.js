//set casper to run
var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    logLevel: "debug",
    verbose: true
  });

var url = 'http://www.supremenewyork.com/shop/all/accessories';
//product options
var product = {
  keyword: 'You Still Suck Keychain',
  color: 'black',
  size: null
}
//user information
var user = {
  name: 'Zach Strenfel',
  email: 'zwstrenfel@gmail.com',
  tel: 8315215176,
  address: '2631 Fulton St',
  zip: 94704,
  city: 'Berkeley',
  state: 'CA',
  credit_card: 'Mastercard',
  cnb: 123456789,
  c_month: 08,
  c_year: 2020,
  ccv: 675
}


//load url and add item to cart.
casper.start(url, function() {
  casper.waitForSelector('div[id="container"]', function() {
    casper.evaluate(function findItem() {
      var productLinks = document.getElementsByClassName('name-link');
      for (var i=0; i < productLinks.length; i++) {
        if (productLinks[i].innerText === 'You Still Suck Keychain') {
          productLinks[i].click();
        }
      }
    });
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