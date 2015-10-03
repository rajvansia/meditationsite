/**
 * Initialize Express
 */

var express = require('express');
var app = express();
var parseAdaptor = require('cloud/prerender-parse.js');

app.use(require('cloud/prerenderio.js').setAdaptor(parseAdaptor(Parse)).set('prerenderToken','jgfLTmRYHnAgu4PHetEP'));
/**
 * Set Up Express
 */

app.set('view engine', 'ejs');    // set EJS as the view engine
app.set('views', 'cloud/views');  // set the EJS folder
app.use(express.bodyParser());    // set middleware

/**
 * Create Routes
 */

app.get('/', function(req, res) {
    counter("pageviews", 1, function(count){
        res.render('home', {pageviews:count});
    });
});
// app.get('/blog', function(req, res) {
//     res.redirect(301,'http://invenioforce.tumblr.com/');
// });

app.get('/rajin', function(req, res) {
    counter("pageviews", 1, function(count){
        res.render('rajin', {pageviews:count});
    });
});
app.get('/rajinn', function(req, res) {
    counter("pageviews", 1, function(count){
        res.render('rajinn', {pageviews:count});
    });
});
app.use(function(req, res) {
    res.status(400)
    res.render('rajin');
});
/**
 * Increment or decrement Counter attribute, pass new value to callback
 *
 * @param (String) attribute name
 * @param (Number) amount to increment (or decrement)
 * @param (Function) fn (new_value)
 *
 */

var counter = function(attr, increment, fn) {
    var query = new Parse.Query("Counter");
    query.equalTo("attr", attr);
    query.first({
        success: function(result) {
            var count = 0;

            if (!result) {
                // create counter attribute-value and set to increment
                // if it doesn't exist
                var obj = Parse.Object("Counter");
                console.log("saving Counter");
                obj.save({"attr":attr, "value":increment});
                count = increment;
            } else {
                // increase (or decrease) counter attribute-value by increment
                result.increment("value", increment);   // increment the value
                count = result.get("value");            // get the new value
                result.save({"value":count});           // save the new value
            }

            // callback fn with new count
            if (typeof fn === "function") fn(count);
        }
    });
};



app.listen();
