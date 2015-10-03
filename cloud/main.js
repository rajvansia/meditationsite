require("cloud/app.js");

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

var API = "key-021d53cb5826444129f6c79c44b3ec66"
// REST API key from parse var API = "key-U5wFQ8aSYU08vHbHBGGhAA2bYQCianvGCHUInA7m"
var Domain = "sandbox9a1bd549307b4773b54d484a3039df14.mailgun.org"
var Mailgun = require('mailgun');
Mailgun.initialize(Domain, API);

Parse.Cloud.beforeSave("emailObject", function(request, response) {

    var text = "Submission Form From raj.com\n\n" +
        "Name: "+request.object.get("name") + "\n\n"+
        "Email: "+request.object.get("email") + "\n\n"+
         "file"+ request.object.get("photo.jpg")+ "\n\n"+
         "Company: "+request.object.get("company") + "\n\n"+
        "Message: \n"+request.object.get("comments");



    Mailgun.sendEmail({
            to: "vansia112@gmail.com",
            from: request.object.get("email"),
            subject: "Submission Form raj.com from: " + request.object.get("name"),
            text: text,
            attachment: request.object.get("photo.jpg")
        }, {
        success: function(httpResponse) {
            response.success();
        },
        error: function(httpResponse) {
            console.error(httpResponse);
            response.error("Uh oh, something went wrong");
        }
    });

});
