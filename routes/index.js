var express = require('express'),
    jsonfile = require('jsonfile'),
    request = require('request'),
    path = require('path');
    cheerio = require('cheerio'),
    fs = require('fs');

var router = express.Router();


//var osmosis = require('osmosis'); //testing out OSMOSIS web scraper

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// var testjs = [];
// request('https://www.jamstockex.com', function (err, res, body) {
//   if (!err && res.statusCode ===200) {
//     console.log('RESP CODE: ', res.statusCode);
//     var $ = cheerio.load(body);
//     var tst1 = $('.js-marquee');
//     var tst1Txt = tst1.text();
//     //console.log(body);
//     $('li').each(function() {
//       var test = $(this).attr('');
//       // console.log('This is TEST:- ', test);
//       testjs.push(test);
//     });
//     console.log(testjs);
//   }
// });
var dest = './public/test.json';
var osmosis = require('osmosis');
var url = 'https://www.jamstockex.com';

osmosis.get(url)
.set({
  title: 'title',
  extensions: [
    osmosis
    .find('div.marquee')
    .set({

      'name': 'ul',
      'link': 'li a',
    })
  ]
})
.data(function(document) {
  console.log(document);
  jsonfile.writeFile(dest, document);
})
;

module.exports = router;
