var express = require('express'),
  jsonfile = require('jsonfile'),
  request = require('request'),
  path = require('path');
cheerio = require('cheerio'),
  fs = require('fs');

var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

var dest = './public/jse.json';
var osmosis = require('osmosis');
//var url = 'https://www.jamstockex.com';
var url = 'https://www.jamstockex.com/ticker-data';
osmosis.get(url)
  .set({
    //title: 'title',
    struct: [
      osmosis
      //.find('div.marquee')
      .find('ul')
      .set({
        //'ticker': 'ul',
        'ticker': 'ul',
      })
    ]
  })
  .data(function(document) {
    var obj = JSON.stringify(document); //get json info & convert it to a string
    obj = obj.replace(/[\s|\\n]+/g, ' ').match(/[A-Z]*[^A-Z]+/g); //remove all newline & extra spaces (NOTE: need to be able to leave 'n' in place it is currently being stripped)

    var item = 'Market ';

    // let matches = obj.filter(s => s.includes(item))
    // console.log(matches);
    //var isTrue = console.log(obj.includes(item));

    if (obj.includes(item)) {
      console.log('Entered MARKET!');
      obj = obj.slice(34);
    } else {
      console.log('We LIVE!');
      obj = obj.slice(2);
    }

    jsonfile.writeFileSync(dest, obj);
  });

module.exports = router;
