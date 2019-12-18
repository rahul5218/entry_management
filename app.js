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
var address="Comp dept SVNIT Surat";
var guests=[];

app.get("/",function(req,res){
  res.redirect("/guest");
});

app.get("/guest",function(req,res){
  res.render("guest",{message:""});
});

app.get("/host",function(req,res){
  res.render("host");
});

app.post("/guest",function(req,res){

  const guest = {
  name:req.body.name,
  email:req.body.email,
  mobile:req.body.mobile,
  checkin:Date()
};

guests.push(guest);

  const msg = {
    to: host_email,
    from: 'entrymanagesystem@ico.com',
    subject: 'guest entry',
    text: 'guest entry',
    html: '<h6>Name: '+guest.name+'</h6><h6>Email: '+guest.email+'</h6><h6>mobile: '+guest.mobile+'</h6><h6>checkin: '+guest.checkin+'</h6>',
  };
        sgMail.send(msg);
  //console.log(guests);
  res.render("checkin",{currentguest:guest,guests:guests});
});

app.post("/host",function(req,res){
  host_name=req.body.name;
  host_email=req.body.email;
  host_mobile=req.body.mobile;
  address=req.body.address;
  //console.log(host_email);
  res.render("guest",{message:"Host created successfully"});
});

app.get("/checkout/:id",function(req,res){

  let currentguest_index;
//  console.log(req.params.id);
  guests.forEach((guest)=>{
    if(guest.email==req.params.id){
      currentguest_index=guests.indexOf(guest);
      checkout=Date();
      const msg = {
        to: req.params.id,
        from: 'entrymanagesystem@ico.com',
        subject: 'your entry details',
        text: 'guest entry',
        html: '<h6>Name: '+guest.name+
              '</h6><h6>Email: '+guest.email+
              '</h6><h6>Mobile: '+guest.mobile+
              '</h6><h6>Checkin: '+guest.checkin+
              '</h6><h6>Checkout: '+checkout+
              '</h6><h6>Host name: '+host_name+
              '</h6><h6>Address Visited: '+address+'</h6>'
      };
            sgMail.send(msg);
    }
  });
  guests.splice(currentguest_index,1);
    res.redirect("/guest");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
