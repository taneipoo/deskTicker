var express = require('express'),
    jsonfile = require('jsonfile'),
    request = require('request'),
    path = require('path');
    cheerio = require('cheerio'),
    fs = require('fs');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var dest = './public/jse.json';
var osmosis = require('osmosis');
var url = 'https://www.jamstockex.com';

osmosis.get(url)
.set({
  //title: 'title',
  struct: [
    osmosis
    .find('div.marquee')
    .set({
      'ticker': 'ul',
      //'link': 'li a',
    })
  ]
})
.data(function(document) {
  console.log(document);
  var obj = JSON.stringify(document);
  obj = obj.replace(/[\s|\\n]+/g, ' ').match(/[A-Z]*[^A-Z]+/g);
  //obj = obj.match(/[A-Z]*[^A-Z]+/g);
  jsonfile.writeFileSync(dest, obj);
});
//
// $(window).scroll(function () {
//    if ($(window).scrollTop() >= $(obj).height() - $(window).height() - 10) {
//       //Add newly-crunched data at the end of the page
//    }
// });
module.exports = router;
