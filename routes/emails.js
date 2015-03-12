var express = require('express');
var Mailgun = require('mailgun-js');
var router = express.Router();

var api_key = 'key-9qhd7g68-qi2es0y62a1nu7s70psfm16';
var domain = 'reque.st';
var from_who = 'harry@reque.st';

/* GET users listing. */
router.post('/send', function(req, res, next) {
  var mailgun = new Mailgun({apiKey: api_key, domain: domain});

  var data = {
  //Specify email data
    from: from_who,
  //The email to contact
    to: req.body.email,
  //Subject and text data
    subject: 'Hello from Harry @ STAY REAL',
    html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://mail.stayrealhk.com/validate?' + req.params.email + '">Click here to add your email address to a mailing list</a>'
  }

  //Invokes the method to send emails given the above data with the helper library
  mailgun.messages().send(data, function (err, body) {
    //If there is an error, render the error page
    if (err) {
      // res.render('error', { error : err});
      console.log("got an error: ", err);
      res.status(err.statusCode).send('email not sent');
    }
    //Else we can greet    and leave
    else {
      //Here "submitted.jade" is the view file for this landing page
      //We pass the variable "email" from the url parameter in an object rendered by Jade
      // res.render('submitted', { email : req.params.mail });
      console.log(body);
      res.send('email sent');
    }
  });

});

module.exports = router;
