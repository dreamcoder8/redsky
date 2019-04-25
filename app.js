const express    = require('express'),
      hbs        = require('express-handlebars'),
      bodyParser = require('body-parser'),
      nodemailer = require('nodemailer')


const app = express();
let session = require('express-session');


app.use(express.static('assets'));

app.use(bodyParser.urlencoded({extended: true}));

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layouts', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');




app.get("/", function(req, res){
  res.render("index", {
    page:"index-nav"
  });
});

app.get("/pricing", function(req, res){
  res.render("pricing", {
    page: "pricing-nav"
  });
});


app.get("/trip-schedule", function(req, res){
  res.render("trip-schedule", {
    page: "trip-nav"
  });
});

app.get("/packing", function(req, res) {
  res.render("packing", {
    page: "packing-nav"
  });
});

app.get("/travel", function(req, res) {
  res.render("getting-here", {
    page: "travel-nav"
  });
});

app.get("/contact", function(req, res){
  res.render("contact", {
    page:"contact-nav"
  });
});

app.post("/contact", function(req, res){
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "jeremy.daniel1981@gmail.com",
      pass: "ncak2018"
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: "jeremy.daniel1981@gmail.com",
    subject: 'New Contact Message',
    text: `
    Full Name: ${req.body.firstName} ${req.body.lastName}
    Phone Number: ${req.body.phone}
    Email: ${req.body.email}
    Estimated Arrival Date: ${req.body.arrivalDate}
    Estimated Departure Date: ${req.body.departureDate}
    Shoe Size: ${req.body.shoeSizeOne}
    Additional Person: ${req.body.personTwo}
    Shoe Size: ${req.body.shoeSizeTwo}
    Additional Person: ${req.body.personThree}
    Shoe Size: ${req.body.shoeSizeThree}
    Additional Person: ${req.body.personFour}
    Shoe Size: ${req.body.shoeSizeFour}

    Additional Questions Comments or Requests: ${req.body.textMessage}
    `
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      console.log('form failed to send');
    } else {
      res.redirect("/success");
    }
  });
});


app.get("/success", function(req, res) {
  res.render("success");
});



app.listen(process.env.PORT || 8000, function(){
  console.log(`Red Sky Server Is Running`);
});
