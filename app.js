//jshint esversion:6
require("dotenv").config();
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app=express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({
  extended:true
}));

var host_name="rahul";
var host_email="rahulshanker52@gmail.com";
var host_mobile="8769898284";

var guestName="";
var guestEmail="";
var guestMobile="";
var checkin;
var checkout;


app.get("/guest",function(req,res){
  res.render("guest",{message:""});
});

app.get("/host",function(req,res){
  res.render("host");
});

app.post("/guest",function(req,res){
  guestName=req.body.name;
  guestEmail=req.body.email;
  guestMobile=req.body.mobile;
  checkin=Date();
  const msg = {
    to: host_email,
    from: 'entrymanagesystem@ico.com',
    subject: 'guest entry',
    text: 'guest entry',
    html: '<h6>Name:'+guestName+'</h6><h6>Email:'+guestEmail+'</h6><h6>mobile:'+guestMobile+'</h6><h6>checkin:'+checkin+'</h6>',
  };
        sgMail.send(msg);
  console.log(checkin);
  res.render("checkin",{name:guestName});
});

app.post("/host",function(req,res){
  host_name=req.body.name;
  host_email=req.body.email;
  host_mobile=req.body.mobile;
  res.render("guest",{message:"host created"});
});

app.get("/checkout",function(req,res){
  checkout=Date();
  const msg = {
    to: guestEmail,
    from: 'entrymanagesystem@ico.com',
    subject: 'your entry details',
    text: 'guest entry',
    html: '<h6>Name:'+guestName+
          '</h6><h6>Email:'+guestEmail+
          '</h6><h6>Mobile:'+guestMobile+
          '</h6><h6>Checkin:'+checkin+
          '</h6><h6>Checkout:'+checkout+
          '</h6><h6>Host name:'+host_name+
          '</h6><h6>Address:BG-24 Tagore Bhavan SVNIT</h6>',
  };
        sgMail.send(msg);

    res.redirect("/guest");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
